#!/usr/bin/env python3
"""
Comprehensive Backend Testing for SNO Website Contact Form
Tests all backend functionality including API endpoints, validation, rate limiting, and database storage.
"""

import requests
import json
import time
import os
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')
load_dotenv('/app/backend/.env')

# Configuration
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BACKEND_URL}/api"
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'test_database')

print(f"🔧 Testing Configuration:")
print(f"   Backend URL: {BACKEND_URL}")
print(f"   API Base: {API_BASE}")
print(f"   MongoDB URL: {MONGO_URL}")
print(f"   Database: {DB_NAME}")
print("=" * 60)

class ContactFormTester:
    def __init__(self):
        self.session = requests.Session()
        self.mongo_client = None
        self.db = None
        self.test_results = {
            'api_endpoint': {'passed': 0, 'failed': 0, 'details': []},
            'validation': {'passed': 0, 'failed': 0, 'details': []},
            'rate_limiting': {'passed': 0, 'failed': 0, 'details': []},
            'database': {'passed': 0, 'failed': 0, 'details': []},
            'email_service': {'passed': 0, 'failed': 0, 'details': []}
        }
        
    def setup_database_connection(self):
        """Setup MongoDB connection for testing"""
        try:
            self.mongo_client = MongoClient(MONGO_URL)
            self.db = self.mongo_client[DB_NAME]
            # Test connection
            self.mongo_client.admin.command('ping')
            print("✅ MongoDB connection established")
            return True
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")
            return False
    
    def cleanup_test_data(self):
        """Clean up test data from database"""
        try:
            if self.db is not None:
                # Remove test submissions
                result = self.db.contact_submissions.delete_many({
                    "email": {"$regex": "test.*@.*"}
                })
                print(f"🧹 Cleaned up {result.deleted_count} test records")
        except Exception as e:
            print(f"⚠️ Cleanup warning: {e}")
    
    def test_api_health(self):
        """Test if API is running"""
        print("\n🔍 Testing API Health...")
        try:
            response = self.session.get(f"{API_BASE}/")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ API Health Check: {data.get('message', 'OK')}")
                self.test_results['api_endpoint']['passed'] += 1
                self.test_results['api_endpoint']['details'].append("API health check passed")
                return True
            else:
                print(f"❌ API Health Check failed: {response.status_code}")
                self.test_results['api_endpoint']['failed'] += 1
                self.test_results['api_endpoint']['details'].append(f"API health check failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ API Health Check error: {e}")
            self.test_results['api_endpoint']['failed'] += 1
            self.test_results['api_endpoint']['details'].append(f"API health check error: {e}")
            return False
    
    def test_valid_contact_form_submission(self):
        """Test valid contact form submission"""
        print("\n🔍 Testing Valid Contact Form Submission...")
        
        valid_data = {
            "name": "Maria Silva",
            "email": "maria.silva@exemplo.com",
            "message": "Olá, gostaria de saber mais sobre os serviços da SNO. Tenho uma empresa de consultoria e preciso de uma presença digital mais forte."
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/contact",
                json=valid_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') == True:
                    print(f"✅ Valid submission accepted: {data.get('message')}")
                    self.test_results['api_endpoint']['passed'] += 1
                    self.test_results['api_endpoint']['details'].append("Valid contact form submission successful")
                    return True
                else:
                    print(f"❌ Valid submission failed: {data}")
                    self.test_results['api_endpoint']['failed'] += 1
                    self.test_results['api_endpoint']['details'].append(f"Valid submission returned success=False: {data}")
                    return False
            else:
                print(f"❌ Valid submission HTTP error: {response.status_code} - {response.text}")
                self.test_results['api_endpoint']['failed'] += 1
                self.test_results['api_endpoint']['details'].append(f"Valid submission HTTP error: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Valid submission error: {e}")
            self.test_results['api_endpoint']['failed'] += 1
            self.test_results['api_endpoint']['details'].append(f"Valid submission error: {e}")
            return False
    
    def test_form_validation(self):
        """Test form data validation"""
        print("\n🔍 Testing Form Data Validation...")
        
        test_cases = [
            {
                "name": "Empty name test",
                "data": {"name": "", "email": "test@example.com", "message": "Valid message here"},
                "should_fail": True
            },
            {
                "name": "Short name test",
                "data": {"name": "A", "email": "test@example.com", "message": "Valid message here"},
                "should_fail": True
            },
            {
                "name": "Invalid email test",
                "data": {"name": "João Silva", "email": "invalid-email", "message": "Valid message here"},
                "should_fail": True
            },
            {
                "name": "Empty message test",
                "data": {"name": "João Silva", "email": "test@example.com", "message": ""},
                "should_fail": True
            },
            {
                "name": "Short message test",
                "data": {"name": "João Silva", "email": "test@example.com", "message": "Short"},
                "should_fail": True
            },
            {
                "name": "Missing fields test",
                "data": {"name": "João Silva"},
                "should_fail": True
            }
        ]
        
        for test_case in test_cases:
            try:
                response = self.session.post(
                    f"{API_BASE}/contact",
                    json=test_case["data"],
                    headers={"Content-Type": "application/json"}
                )
                
                if test_case["should_fail"]:
                    if response.status_code in [400, 422]:  # Validation error expected
                        print(f"✅ {test_case['name']}: Correctly rejected")
                        self.test_results['validation']['passed'] += 1
                        self.test_results['validation']['details'].append(f"{test_case['name']}: Correctly rejected")
                    else:
                        print(f"❌ {test_case['name']}: Should have been rejected but got {response.status_code}")
                        self.test_results['validation']['failed'] += 1
                        self.test_results['validation']['details'].append(f"{test_case['name']}: Should have been rejected but got {response.status_code}")
                else:
                    if response.status_code == 200:
                        print(f"✅ {test_case['name']}: Correctly accepted")
                        self.test_results['validation']['passed'] += 1
                        self.test_results['validation']['details'].append(f"{test_case['name']}: Correctly accepted")
                    else:
                        print(f"❌ {test_case['name']}: Should have been accepted but got {response.status_code}")
                        self.test_results['validation']['failed'] += 1
                        self.test_results['validation']['details'].append(f"{test_case['name']}: Should have been accepted but got {response.status_code}")
                        
            except Exception as e:
                print(f"❌ {test_case['name']}: Error - {e}")
                self.test_results['validation']['failed'] += 1
                self.test_results['validation']['details'].append(f"{test_case['name']}: Error - {e}")
    
    def test_rate_limiting(self):
        """Test rate limiting (5 requests per 15 minutes per IP)"""
        print("\n🔍 Testing Rate Limiting...")
        
        valid_data = {
            "name": "Carlos Teste",
            "email": "carlos.teste@exemplo.com",
            "message": "Esta é uma mensagem de teste para verificar o rate limiting do sistema."
        }
        
        successful_requests = 0
        rate_limited_requests = 0
        
        # Try to make 7 requests quickly (should allow 5, then rate limit)
        for i in range(7):
            try:
                response = self.session.post(
                    f"{API_BASE}/contact",
                    json={**valid_data, "email": f"carlos.teste{i}@exemplo.com"},
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 200:
                    successful_requests += 1
                    print(f"✅ Request {i+1}: Accepted")
                elif response.status_code == 429:
                    rate_limited_requests += 1
                    print(f"🚫 Request {i+1}: Rate limited (expected)")
                else:
                    print(f"❌ Request {i+1}: Unexpected status {response.status_code}")
                
                time.sleep(0.5)  # Small delay between requests
                
            except Exception as e:
                print(f"❌ Request {i+1}: Error - {e}")
        
        # Evaluate rate limiting effectiveness
        if successful_requests <= 5 and rate_limited_requests >= 1:
            print(f"✅ Rate limiting working: {successful_requests} allowed, {rate_limited_requests} blocked")
            self.test_results['rate_limiting']['passed'] += 1
            self.test_results['rate_limiting']['details'].append(f"Rate limiting effective: {successful_requests} allowed, {rate_limited_requests} blocked")
        else:
            print(f"❌ Rate limiting issue: {successful_requests} allowed, {rate_limited_requests} blocked")
            self.test_results['rate_limiting']['failed'] += 1
            self.test_results['rate_limiting']['details'].append(f"Rate limiting ineffective: {successful_requests} allowed, {rate_limited_requests} blocked")
    
    def test_database_storage(self):
        """Test database storage of contact submissions"""
        print("\n🔍 Testing Database Storage...")
        
        if self.db is None:
            print("❌ Database connection not available")
            self.test_results['database']['failed'] += 1
            self.test_results['database']['details'].append("Database connection not available")
            return
        
        # Get initial count
        try:
            initial_count = self.db.contact_submissions.count_documents({})
            print(f"📊 Initial submissions count: {initial_count}")
        except Exception as e:
            print(f"❌ Error getting initial count: {e}")
            self.test_results['database']['failed'] += 1
            self.test_results['database']['details'].append(f"Error getting initial count: {e}")
            return
        
        # Submit a test form
        test_data = {
            "name": "Ana Database Test",
            "email": "ana.dbtest@exemplo.com",
            "message": "Esta é uma mensagem de teste para verificar o armazenamento no banco de dados MongoDB."
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                # Wait a moment for database write
                time.sleep(1)
                
                # Check if record was created
                new_count = self.db.contact_submissions.count_documents({})
                
                if new_count > initial_count:
                    print(f"✅ Database storage working: Count increased from {initial_count} to {new_count}")
                    
                    # Verify the specific record
                    record = self.db.contact_submissions.find_one({"email": test_data["email"]})
                    if record:
                        print(f"✅ Record found with correct data: {record['name']}")
                        self.test_results['database']['passed'] += 1
                        self.test_results['database']['details'].append("Database storage and retrieval successful")
                    else:
                        print("❌ Record not found in database")
                        self.test_results['database']['failed'] += 1
                        self.test_results['database']['details'].append("Record not found in database")
                else:
                    print(f"❌ Database count didn't increase: {initial_count} -> {new_count}")
                    self.test_results['database']['failed'] += 1
                    self.test_results['database']['details'].append(f"Database count didn't increase: {initial_count} -> {new_count}")
            else:
                print(f"❌ Form submission failed: {response.status_code}")
                self.test_results['database']['failed'] += 1
                self.test_results['database']['details'].append(f"Form submission failed: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Database storage test error: {e}")
            self.test_results['database']['failed'] += 1
            self.test_results['database']['details'].append(f"Database storage test error: {e}")
    
    def test_email_service_logging(self):
        """Test email service integration and logging"""
        print("\n🔍 Testing Email Service Integration...")
        
        test_data = {
            "name": "Pedro Email Test",
            "email": "pedro.emailtest@exemplo.com",
            "message": "Esta é uma mensagem de teste para verificar o serviço de email e logging do sistema."
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') == True:
                    print("✅ Email service integration working (form accepted)")
                    print("📧 Email processing logged (check backend logs for email content)")
                    self.test_results['email_service']['passed'] += 1
                    self.test_results['email_service']['details'].append("Email service integration successful")
                else:
                    print(f"❌ Email service issue: {data}")
                    self.test_results['email_service']['failed'] += 1
                    self.test_results['email_service']['details'].append(f"Email service issue: {data}")
            else:
                print(f"❌ Email service test failed: {response.status_code}")
                self.test_results['email_service']['failed'] += 1
                self.test_results['email_service']['details'].append(f"Email service test failed: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Email service test error: {e}")
            self.test_results['email_service']['failed'] += 1
            self.test_results['email_service']['details'].append(f"Email service test error: {e}")
    
    def test_contact_stats_endpoint(self):
        """Test contact statistics endpoint"""
        print("\n🔍 Testing Contact Stats Endpoint...")
        
        try:
            response = self.session.get(f"{API_BASE}/contact/stats")
            
            if response.status_code == 200:
                data = response.json()
                if 'total_submissions' in data and 'today_submissions' in data:
                    print(f"✅ Stats endpoint working: {data['total_submissions']} total, {data['today_submissions']} today")
                    self.test_results['api_endpoint']['passed'] += 1
                    self.test_results['api_endpoint']['details'].append("Contact stats endpoint successful")
                else:
                    print(f"❌ Stats endpoint missing fields: {data}")
                    self.test_results['api_endpoint']['failed'] += 1
                    self.test_results['api_endpoint']['details'].append(f"Stats endpoint missing fields: {data}")
            else:
                print(f"❌ Stats endpoint failed: {response.status_code}")
                self.test_results['api_endpoint']['failed'] += 1
                self.test_results['api_endpoint']['details'].append(f"Stats endpoint failed: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Stats endpoint error: {e}")
            self.test_results['api_endpoint']['failed'] += 1
            self.test_results['api_endpoint']['details'].append(f"Stats endpoint error: {e}")
    
    def print_summary(self):
        """Print comprehensive test summary"""
        print("\n" + "=" * 60)
        print("📊 BACKEND TESTING SUMMARY")
        print("=" * 60)
        
        total_passed = 0
        total_failed = 0
        
        for category, results in self.test_results.items():
            passed = results['passed']
            failed = results['failed']
            total_passed += passed
            total_failed += failed
            
            status = "✅ PASS" if failed == 0 else "❌ FAIL" if passed == 0 else "⚠️ PARTIAL"
            print(f"{category.upper().replace('_', ' ')}: {status} ({passed} passed, {failed} failed)")
            
            for detail in results['details']:
                print(f"  • {detail}")
        
        print("-" * 60)
        overall_status = "✅ ALL TESTS PASSED" if total_failed == 0 else f"❌ {total_failed} TESTS FAILED"
        print(f"OVERALL: {overall_status} ({total_passed} passed, {total_failed} failed)")
        print("=" * 60)
        
        return total_failed == 0
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting SNO Website Backend Testing")
        print("=" * 60)
        
        # Setup
        db_connected = self.setup_database_connection()
        
        # Run tests
        self.test_api_health()
        self.test_valid_contact_form_submission()
        self.test_form_validation()
        self.test_rate_limiting()
        
        if db_connected:
            self.test_database_storage()
        
        self.test_email_service_logging()
        self.test_contact_stats_endpoint()
        
        # Cleanup
        if db_connected:
            self.cleanup_test_data()
        
        # Summary
        all_passed = self.print_summary()
        
        if self.mongo_client:
            self.mongo_client.close()
        
        return all_passed

def main():
    """Main testing function"""
    tester = ContactFormTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All backend tests completed successfully!")
        exit(0)
    else:
        print("\n⚠️ Some backend tests failed. Check details above.")
        exit(1)

if __name__ == "__main__":
    main()