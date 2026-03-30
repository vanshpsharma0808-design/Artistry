import requests
import sys
import json
from datetime import datetime, timedelta

class SalonAPITester:
    def __init__(self, base_url="https://premium-salon-anand.preview.emergentagent.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.tests_run = 0
        self.tests_passed = 0
        self.admin_credentials = {
            "email": "admin@artistrysalon.com",
            "password": "Admin@123"
        }

    def run_test(self, name, method, endpoint, expected_status, data=None, cookies=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=headers)
            elif method == 'POST':
                response = self.session.post(url, json=data, headers=headers)
            elif method == 'PATCH':
                response = self.session.patch(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.text and response.status_code < 500 else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_admin_login(self):
        """Test admin login and get cookies"""
        print("\n=== TESTING ADMIN AUTHENTICATION ===")
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/auth/login",
            200,
            data=self.admin_credentials
        )
        
        if success:
            # Check if cookies are set
            cookies = self.session.cookies
            print(f"   Cookies received: {dict(cookies)}")
            return True
        return False

    def test_auth_me(self):
        """Test getting current user info"""
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "api/auth/me",
            200
        )
        return success

    def test_create_booking(self):
        """Test creating a booking"""
        print("\n=== TESTING BOOKING OPERATIONS ===")
        booking_data = {
            "service_category": "Hair",
            "service_name": "Hair Cut & Style",
            "stylist": "Priya Sharma",
            "date": (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d"),
            "time": "10:00 AM",
            "customer_name": "Test Customer",
            "customer_phone": "9876543210",
            "notes": "Test booking"
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "api/bookings",
            200,
            data=booking_data
        )
        
        if success and 'id' in response:
            self.booking_id = response['id']
            print(f"   Created booking with ID: {self.booking_id}")
            return True
        return False

    def test_get_bookings(self):
        """Test getting all bookings (requires admin auth)"""
        success, response = self.run_test(
            "Get All Bookings",
            "GET",
            "api/bookings",
            200
        )
        
        if success:
            print(f"   Found {len(response)} bookings")
            return True
        return False

    def test_get_bookings_with_date_filter(self):
        """Test getting bookings with date filter"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        success, response = self.run_test(
            "Get Bookings with Date Filter",
            "GET",
            f"api/bookings?date={tomorrow}",
            200
        )
        
        if success:
            print(f"   Found {len(response)} bookings for {tomorrow}")
            return True
        return False

    def test_update_booking_status(self):
        """Test updating booking status"""
        if not hasattr(self, 'booking_id'):
            print("❌ No booking ID available for status update test")
            return False
            
        success, response = self.run_test(
            "Update Booking Status to Confirmed",
            "PATCH",
            f"api/bookings/{self.booking_id}",
            200,
            data={"status": "confirmed"}
        )
        
        if success:
            # Test updating to completed
            success2, response2 = self.run_test(
                "Update Booking Status to Completed",
                "PATCH",
                f"api/bookings/{self.booking_id}",
                200,
                data={"status": "completed"}
            )
            return success2
        return False

    def test_logout(self):
        """Test admin logout"""
        success, response = self.run_test(
            "Admin Logout",
            "POST",
            "api/auth/logout",
            200
        )
        return success

    def test_unauthorized_access(self):
        """Test accessing protected endpoints without auth"""
        print("\n=== TESTING UNAUTHORIZED ACCESS ===")
        # Clear session cookies
        self.session.cookies.clear()
        
        success, response = self.run_test(
            "Unauthorized Booking Access",
            "GET",
            "api/bookings",
            401  # Should fail with 401
        )
        return success

def main():
    print("🚀 Starting Salon Booking API Tests")
    print("=" * 50)
    
    tester = SalonAPITester()
    
    # Test sequence
    tests = [
        ("Admin Login", tester.test_admin_login),
        ("Get Current User", tester.test_auth_me),
        ("Create Booking", tester.test_create_booking),
        ("Get All Bookings", tester.test_get_bookings),
        ("Get Bookings with Date Filter", tester.test_get_bookings_with_date_filter),
        ("Update Booking Status", tester.test_update_booking_status),
        ("Admin Logout", tester.test_logout),
        ("Unauthorized Access", tester.test_unauthorized_access),
    ]
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            if not result:
                print(f"⚠️  Test '{test_name}' failed - continuing with remaining tests")
        except Exception as e:
            print(f"💥 Test '{test_name}' crashed: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 FINAL RESULTS")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "0%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())