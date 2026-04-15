# Resume Builder API Documentation

This documentation covers all available endpoints for the Resume Builder platform. Use these details to test the API with tools like Postman.

**Base URL:** `http://localhost:8000`

---

## 1. Authentication (`/api/auth/`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register/` | Register a new user. |
| **POST** | `/api/auth/login/` | Obtain JWT tokens (Login). |
| **POST** | `/api/auth/refresh/` | Refresh the access token. |
| **GET** | `/api/auth/me/` | Get current user's profile. |
| **GET** | `/api/auth/verify/` | Verify email (via link). |

### Login Example
**POST** `/api/auth/login/`
```json
{
  "username": "nasrat",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "access": "eyJhbGciOiJIUzI1Ni...",
  "refresh": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "id": 1,
    "username": "nasrat",
    "email": "user@example.com"
  }
}
```

---

## 2. Templates (`/api/templates/`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/templates/` | List all available resume templates. |
| **GET** | `/api/templates/{id}/` | Get details of a specific template. |

---

## 3. Resumes (`/api/resumes/`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/resumes/` | List all resumes for the logged-in user. |
| **POST** | `/api/resumes/` | Create a new resume. |
| **GET** | `/api/resumes/{id}/` | Get details of a specific resume. |
| **PUT** | `/api/resumes/{id}/` | Update resume title, template, or slug. |
| **DELETE** | `/api/resumes/{id}/` | Delete a resume. |
| **GET** | `/api/resumes/{slug}/public/` | Fetch a public resume (No Auth). |

### Create Resume Example
**POST** `/api/resumes/`
```json
{
  "title": "Software Engineer Resume",
  "template": 1,
  "slug": "software-engineer-nasrat"
}
```

---

## 4. Resume Details (Components)

### Internal Personal Info
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/resumes/{resume_id}/personal-info/` | Get personal info for a resume. |
| **PUT** | `/api/resumes/{resume_id}/personal-info/` | Update personal info (Name, Bio, Photo, etc). |

### Experience / Education / Skills / etc.
All follow a similar pattern:
- **List/Create**: `/api/resumes/{resume_id}/{component}/` (e.g., `/api/resumes/1/experience/`)
- **Detail/Update/Delete**: `/api/{component}/{item_id}/` (e.g., `/api/experience/5/`)

**Components available:**
- `education`
- `experience`
- `projects`
- `skills`
- `certificates`
- `languages`

---

## 5. Downloads & Exports

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/resumes/{resume_id}/download/pdf/` | Generate and download PDF. |
| **GET** | `/api/resumes/{resume_id}/download/docx/` | Generate and download DOCX. |

---

> [!TIP]
> **Authentication Header**: For most requests, include the access token in the header:
> `Authorization: Bearer <your_access_token>`
