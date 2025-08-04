from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime
import uuid

class ContactFormRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)

    @validator('name')
    def validate_name(cls, v):
        v = v.strip()
        if not v:
            raise ValueError('Nome é obrigatório')
        if len(v) < 2:
            raise ValueError('Nome deve ter pelo menos 2 caracteres')
        return v

    @validator('message')
    def validate_message(cls, v):
        v = v.strip()
        if not v:
            raise ValueError('Mensagem é obrigatória')
        if len(v) < 10:
            raise ValueError('Mensagem deve ter pelo menos 10 caracteres')
        return v

class ContactFormResponse(BaseModel):
    success: bool
    message: str
    errors: Optional[list] = None

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None