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