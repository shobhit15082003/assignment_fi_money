#!/usr/bin/env python3
import json
import requests

BASE_URL = "http://localhost:8080"  # your API base URL
TIMEOUT = 10  # seconds


def print_result(test_name, passed, expected=None, got=None, request_data=None, response_body=None):
    """
    Prints test result.
    If passed, prints only success.
    If failed, prints request, expected vs got, and response body.
    """
    if passed:
        print(f"{test_name}: PASSED")
    else:
        print(f"{test_name}: FAILED")
        if request_data is not None:
            try:
                print(f" Request: {json.dumps(request_data, indent=2)}")
            except Exception:
                print(f" Request: {request_data}")
        if expected is not None and got is not None:
            print(f" Expected: {expected}, Got: {got}")
        if response_body is not None:
            print(f" Response Body: {response_body}")


def test_register_user():
    payload = {"username": "puja", "password": "mypassword"}
    try:
        res = requests.post(f"{BASE_URL}/register", json=payload, timeout=TIMEOUT)
    except Exception as e:
        print_result("User Registration", False, "201 or 409", "No response", payload, str(e))
        return

    passed = res.status_code in (201, 409)
    print_result("User Registration", passed, "201 or 409", res.status_code, payload, res.text)


def test_login():
    payload = {"username": "puja", "password": "mypassword"}
    try:
        res = requests.post(f"{BASE_URL}/login", json=payload, timeout=TIMEOUT)
    except Exception as e:
        print_result("Login Test", False, "HTTP 200 with access_token", "No response", payload, str(e))
        return None

    token = None
    passed = False
    if res.status_code == 200:
        try:
            token = res.json().get("access_token")
            passed = token is not None
        except Exception:
            passed = False

    print_result(
        "Login Test",
        passed,
        expected="HTTP 200 with access_token",
        got=f"HTTP {res.status_code}",
        request_data=payload,
        response_body=res.text
    )
    return token


def test_add_product(token):
    payload = {
        "name": "Phone2",
        "type": "Electronics",
        "sku": "PHN-001",
        "image_url": "https://example.com/phone.jpg",
        "description": "Latest Phone",
        "quantity": 5,
        "price": 999.99
    }
    headers = {"Authorization": f"Bearer {token}"}
    try:
        res = requests.post(f"{BASE_URL}/products", json=payload, headers=headers, timeout=TIMEOUT)
    except Exception as e:
        print_result("Add Product", False, 201, "No response", payload, str(e))
        return None

    passed = res.status_code == 201
    if passed:
        print("Add Product: PASSED")
        try:
            return res.json().get("product_id")
        except Exception:
            return None
    else:
        print_result("Add Product", False, 201, res.status_code, payload, res.text)
        return None


def test_update_quantity(token, product_id, new_quantity):
    payload = {"quantity": new_quantity}
    headers = {"Authorization": f"Bearer {token}"}
    try:
        res = requests.put(
            f"{BASE_URL}/products/{product_id}/quantity",
            json=payload,
            headers=headers,
            timeout=TIMEOUT
        )
    except Exception as e:
        print_result("Update Quantity", False, 200, "No response", payload, str(e))
        return

    passed = res.status_code == 200
    if passed:
        try:
            updated_info = res.json()
            updated_qty = updated_info.get("quantity", "unknown")
            print(f"Update Quantity: PASSED, Updated quantity: {updated_qty}")
        except Exception:
            print("Update Quantity: PASSED, but response body is not valid JSON")
    else:
        print_result("Update Quantity", False, 200, res.status_code, payload, res.text)


def test_get_products(token, expected_quantity):
    headers = {"Authorization": f"Bearer {token}"}
    try:
        res = requests.get(f"{BASE_URL}/products", headers=headers, timeout=TIMEOUT)
    except Exception as e:
        print_result("Get Products", False, 200, "No response", None, str(e))
        return

    if res.status_code != 200:
        print_result("Get Products", False, 200, res.status_code, None, res.text)
        return

    try:
        data = res.json()
    except Exception:
        print_result("Get Products", False, "valid JSON", "Invalid JSON", None, res.text)
        return

    # Accept either a plain list or { "products": [...] }
    if isinstance(data, list):
        products = data
    elif isinstance(data, dict):
        products = data.get("products", [])
    else:
        products = []

    phone_products = [p for p in products if p.get("name") == "Phone2"]
    if not phone_products:
        print("Get Products: FAILED")
        print("  Could not find product named 'Phone2'")
        print(f"  Response Body: {data}")
        return

    phone_quantity = phone_products[0].get("quantity")
    if phone_quantity == expected_quantity:
        print(f"Get Products: PASSED (Quantity = {phone_quantity})")
    else:
        print("Get Products: FAILED")
        print(f"  Expected Quantity: {expected_quantity}, Got: {phone_quantity}")
        print(f"  Response Body: {data}")


def run_all_tests():
    test_register_user()

    token = test_login()
    if not token:
        print("Login failed. Skipping further tests.")
        return

    product_id = test_add_product(token)
    if not product_id:
        print("Product creation failed. Skipping further tests.")
        return

    new_quantity = 15
    test_update_quantity(token, product_id, new_quantity)
    test_get_products(token, expected_quantity=new_quantity)


if __name__ == "__main__":
    run_all_tests()

