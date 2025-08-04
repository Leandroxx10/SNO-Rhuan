# API Contracts - SNO Website

## Backend Implementation Plan

### Contact Form API

#### Endpoint
- **POST** `/api/contact`

#### Request Body
```json
{
  "name": "string", // required, min 2 chars
  "email": "string", // required, valid email format
  "message": "string" // required, min 10 chars
}
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso! Entraremos em contato em breve."
}
```

#### Error Response (400/500)
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Field specific errors"] // optional
}
```

## Current Mock Data to Replace

### Frontend Mock Location
- File: `/app/frontend/src/data/mock.js`
- Function: `submitContactForm(formData)`
- Current: Returns mock promise with 2s delay
- Replace with: Real API call to `/api/contact`

## Backend Implementation Details

### Email Service
- Use nodemailer with SMTP
- Send emails to: contato@sno.digital
- Email template with form data
- Include sender info and form fields

### Validation
- Server-side validation for all fields
- Sanitize input data
- Rate limiting for form submissions

### Database (Optional)
- Store contact form submissions in MongoDB
- Include timestamp, IP, form data
- For follow-up and analytics

## Frontend Integration Changes

### Remove Mock
1. Remove `submitContactForm` function from `mock.js`
2. Create real API service in `/app/frontend/src/services/api.js`

### API Service
```javascript
export const submitContactForm = async (formData) => {
  const response = await fetch(`${BACKEND_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.json();
};
```

### Error Handling
- Network errors
- Validation errors
- Server errors
- User-friendly messages

## Testing Protocol

### Backend Testing
1. Test endpoint with valid data
2. Test validation errors
3. Test email sending
4. Test rate limiting

### Frontend Testing
1. Form submission flow
2. Success/error states
3. Loading states
4. Toast notifications

### Integration Testing
1. End-to-end form submission
2. Email delivery verification
3. Error handling scenarios