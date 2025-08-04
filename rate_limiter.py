from datetime import datetime, timedelta
from collections import defaultdict
import logging

logger = logging.getLogger(__name__)

class RateLimiter:
    def __init__(self):
        # In production, use Redis or a proper cache
        # For now, using in-memory storage
        self.requests = defaultdict(list)
        
    def is_allowed(self, identifier: str, max_requests: int = 5, window_minutes: int = 15):
        """
        Check if request is allowed based on rate limiting
        Args:
            identifier: IP address or user identifier
            max_requests: Maximum requests allowed in time window
            window_minutes: Time window in minutes
        Returns:
            bool: True if allowed, False if rate limited
        """
        now = datetime.utcnow()
        window_start = now - timedelta(minutes=window_minutes)
        
        # Clean old requests outside the window
        self.requests[identifier] = [
            req_time for req_time in self.requests[identifier] 
            if req_time > window_start
        ]
        
        # Check if under limit
        if len(self.requests[identifier]) < max_requests:
            self.requests[identifier].append(now)
            return True
        
        logger.warning(f"Rate limit exceeded for {identifier}")
        return False
    
    def get_remaining_requests(self, identifier: str, max_requests: int = 5):
        """Get remaining requests for identifier"""
        current_requests = len(self.requests.get(identifier, []))
        return max(0, max_requests - current_requests)
    
    def get_reset_time(self, identifier: str, window_minutes: int = 15):
        """Get time when rate limit resets"""
        if identifier not in self.requests or not self.requests[identifier]:
            return None
        
        oldest_request = min(self.requests[identifier])
        reset_time = oldest_request + timedelta(minutes=window_minutes)
        return reset_time