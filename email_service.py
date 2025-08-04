import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        # Will use environment variables for production
        # For now, we'll create a basic email template
        
    def create_contact_email_template(self, form_data):
        """Create HTML email template for contact form submission"""
        
        html_template = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #1f2937; color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 20px; }}
                .footer {{ background: #374151; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #1f2937; }}
                .value {{ background: white; padding: 10px; border-radius: 4px; border: 1px solid #e5e7eb; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🚀 Nova Mensagem - SNO Website</h2>
                </div>
                
                <div class="content">
                    <div class="field">
                        <div class="label">Nome do Cliente:</div>
                        <div class="value">{form_data['name']}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">E-mail:</div>
                        <div class="value">{form_data['email']}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">Mensagem:</div>
                        <div class="value">{form_data['message']}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">Data/Hora:</div>
                        <div class="value">{datetime.now().strftime('%d/%m/%Y às %H:%M')}</div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>SNO - Seu Negócio Online | contato@sno.digital</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return html_template
    
    def send_contact_form_email(self, form_data):
        """
        Send contact form email notification
        Currently logs email content for development
        In production, implement actual SMTP sending
        """
        try:
            # Create email content
            subject = f"[SNO Website] Nova mensagem de {form_data['name']}"
            html_content = self.create_contact_email_template(form_data)
            
            # For development, log the email content
            logger.info("=== CONTACT FORM EMAIL ===")
            logger.info(f"To: contato@sno.digital")
            logger.info(f"Subject: {subject}")
            logger.info(f"From: {form_data['name']} <{form_data['email']}>")
            logger.info(f"Message Preview: {form_data['message'][:100]}...")
            logger.info("=== EMAIL LOGGED SUCCESSFULLY ===")
            
            return True, "Email processado com sucesso"
            
        except Exception as e:
            logger.error(f"Erro ao processar email: {str(e)}")
            return False, f"Erro ao processar email: {str(e)}"