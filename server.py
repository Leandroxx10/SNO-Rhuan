from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime

# Import our models and services
from models import ContactFormRequest, ContactFormResponse, ContactSubmission
from email_service import EmailService
from rate_limiter import RateLimiter

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize services
email_service = EmailService()
rate_limiter = RateLimiter()

# Create the main app
app = FastAPI()

# Create API router
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@api_router.get("/")
async def root():
    return {"message": "SNO Website API is running"}

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(form_data: ContactFormRequest, request: Request):
    """
    Handle contact form submissions
    """
    try:
        # Get client IP for rate limiting
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "")
        
        # Apply rate limiting (5 requests per 15 minutes per IP)
        if not rate_limiter.is_allowed(client_ip, max_requests=5, window_minutes=15):
            remaining_time = rate_limiter.get_reset_time(client_ip, window_minutes=15)
            raise HTTPException(
                status_code=429, 
                detail={
                    "success": False,
                    "message": "Muitas tentativas. Tente novamente em alguns minutos.",
                    "reset_time": remaining_time.isoformat() if remaining_time else None
                }
            )
        
        # Create submission record
        submission = ContactSubmission(
            name=form_data.name,
            email=form_data.email,
            message=form_data.message,
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        # Store in database
        await db.contact_submissions.insert_one(submission.dict())
        logger.info(f"Contact form submitted by {form_data.name} ({form_data.email})")
        
        # Send email notification
        email_success, email_message = email_service.send_contact_form_email(form_data.dict())
        
        if not email_success:
            logger.error(f"Email sending failed: {email_message}")
            # Don't fail the request if email fails, just log it
            
        # Return success response
        return ContactFormResponse(
            success=True,
            message="Mensagem enviada com sucesso! Entraremos em contato em breve."
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions (like rate limiting)
        raise
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "message": "Erro interno do servidor. Tente novamente mais tarde."
            }
        )

@api_router.get("/contact/stats")
async def get_contact_stats():
    """
    Get contact form submission statistics
    """
    try:
        total_submissions = await db.contact_submissions.count_documents({})
        today_submissions = await db.contact_submissions.count_documents({
            "timestamp": {"$gte": datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)}
        })
        
        return {
            "total_submissions": total_submissions,
            "today_submissions": today_submissions
        }
    except Exception as e:
        logger.error(f"Error getting contact stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao obter estatísticas")

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()