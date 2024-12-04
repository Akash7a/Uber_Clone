### **Endpoint: User Registration**

#### **Endpoint URL:**  
`POST /api/v1/users/register`

#### **Description:**  
Registers a new user by validating their input, hashing their password, and saving the data to the database. A JWT token is returned upon successful registration.

---

### **Request:**

#### **Headers:**  
- `Content-Type: application/json`

#### **Body (JSON):**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```
- **fullname.firstname**: (Required) String, at least 3 characters long.  
- **fullname.lastname**: (Optional) String, at least 3 characters long.  
- **email**: (Required) String, must be a valid email address.  
- **password**: (Required) String, at least 6 characters long.

---

### **Response:**

#### **Success:**
- **Status Code: `201 Created`**
```json
{
  "token": "generatedAuthToken",
  "user": {
    "_id": "userObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```
 ## Endpoint: User Login
 ## URL:
 ## POST /api/v1/users/login

 ## Description:
(Authenticates a user by validating their email and password. Returns a JWT token upon successful authentication.)

Request:
Headers:
Content-Type: application/json

Body (JSON):

json
Copy code
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
email: (Required) String, must be a valid email address.
password: (Required) String, must match the user's password.
Response:
Success:
Status Code: 200 OK

json
Copy code
{
  "token": "generatedAuthToken",
  "user": {
    "_id": "userObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}

## Get User Profile
URL: GET /api/v1/users/profile
Description: Fetches the authenticated user's profile.
Headers:
Authorization: Bearer <JWT_TOKEN> or token cookie.
Response:
200 OK: User profile data.
401 Unauthorized: Invalid or missing token.
2. ##  Logout
URL: POST /api/v1/users/logout
Description: Logs out the user by clearing the authentication token.
Headers:
Authorization: Bearer <JWT_TOKEN> or token cookie.
Response:
200 OK: { "message": "Logout successful." }
401 Unauthorized: Invalid or missing token