# College Management System Documentation

## Overview

The College Management System is designed to manage and automate various aspects of college operations, including student registration, course management, attendance tracking, internal marks management, and more. The system is built using the **MERN (MongoDB, Express, React, Node.js)** stack.

## Features

1. **User Roles**:

   - **Student**: Can register, view their attendance, and view internal marks.
   - **Teacher**: Can upload/update marks and attendance for students in their assigned subjects.
   - **Admin**: Can assign teachers to specific subjects, assign students to courses, branches, and sections, and manage the overall system.

2. **Batch Management**:

   - Admin can create batches (e.g., 2021, 2024).
   - Each batch can have multiple courses (e.g., BTech).
   - Each course can have multiple branches (e.g., CSE, ECE).
   - Each branch can have multiple sections (e.g., CSEA, ECEB).

3. **Course Management**:

   - Courses are associated with specific branches and sections within a batch.

4. **Subject Management**:

   - Each subject is taught by a teacher and associated with a specific section.

5. **Attendance Management**:

   - Teachers can update attendance for students in their classes.
   - Students can view their attendance percentage for each subject.

6. **Marks Management**:
   - Teachers can upload and update internal marks for students.
   - Students can view their internal marks.

## Project Structure

```
/college-management-system
│
├── /controllers           # Contains all the controllers (business logic)
│   ├── userController.js
│   ├── batchController.js
│   ├── attendanceController.js
│   ├── marksController.js
│   └── ...
│
├── /models                # Contains all the Mongoose models
│   ├── index.js
│
├── /routes                # Contains all the Express routes
│   ├── userRoutes.js
│   ├── batchRoutes.js
│   ├── attendanceRoutes.js
│   ├── marksRoutes.js
│   └── ...
│
│
├── /middleware            # Middleware for authentication, error handling, etc.
│   └── authMiddleware.js
│
│
├── /client                # Frontend React application
│   ├── /src
│   └── ...
│
├── .env                   # Environment variables (e.g., JWT_SECRET, DB_URI)
├── package.json           # Node.js dependencies and scripts
├── README.md              # Project documentation
└── index.js               # Entry point for the Express server
```

## Technologies Used

- **MongoDB**: NoSQL database to store all data (users, courses, attendance, etc.).
- **Express.js**: Web framework for building the RESTful API.
- **React.js**: Frontend library for building the user interface (UI).
- **Node.js**: JavaScript runtime for server-side development.
- **Mongoose**: ODM library for MongoDB and Node.js, allowing interaction with the MongoDB database using schema-based models.
- **JWT (JSON Web Token)**: For authentication and authorization.
- **bcrypt.js**: For hashing passwords.

## API Endpoints

### User Registration and Login

- **POST /api/users/register**: Register a new user (student, teacher, admin).

  - Request Body:
    ```json
    {
      "userid": "123456",
      "name": "John Doe",
      "password": "SecurePassword123",
      "role": "student",
      "course": "course_id",
      "branch": "branch_id",
      "section": "section_id"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "user_id",
        "userid": "123456",
        "name": "John Doe",
        "role": "student",
        "course": "course_id",
        "branch": "branch_id",
        "section": "section_id"
      },
      "token": "jwt_token"
    }
    ```

- **POST /api/users/login**: Log in an existing user.
  - Request Body:
    ```json
    {
      "userid": "123456",
      "password": "SecurePassword123"
    }
    ```
  - Response:
    ```json
    {
      "message": "User logged in successfully",
      "user": {
        "id": "user_id",
        "userid": "123456",
        "name": "John Doe",
        "role": "student",
        "course": "course_id",
        "branch": "branch_id",
        "section": "section_id"
      },
      "token": "jwt_token"
    }
    ```

### Batch Management

- **POST /api/batches**: Create a new batch.

  - Request Body:
    ```json
    {
      "year": 2021,
      "courses": [
        {
          "courseName": "course_id",
          "branches": [
            {
              "branch": "branch_id",
              "sections": [
                { "section": "section_id1" },
                { "section": "section_id2" }
              ]
            }
          ]
        }
      ]
    }
    ```
  - Response:
    ```json
    {
      "year": 2021,
      "courses": [....]
    }
    ```

- **GET /api/batches/:year**: Get a batch by year.

  - Response:
    ```json
    {
      "year": 2021,
      "courses": [... ]
    }
    ```

- **PUT /api/batches/:year**: Update an existing batch.
- **DELETE /api/batches/:year**: Delete a batch.

### Attendance Management

- **POST /api/attendance**: Add attendance for students in a specific class.

  - Request Body:
    ```json
    {
      "student": "student_id",
      "class": "class_id",
      "date": "2024-01-01",
      "status": "Present"
    }
    ```
  - Response:
    ```json
    {
      "message": "Attendance recorded successfully"
    }
    ```

- **GET /api/attendance/:userId**: Get attendance for a specific student.

  - Response:

    ```json
    {
    "attendance": [
    {
    "subjectName": "Mathematics",
    "subjectCode": "MATH101",
    "attendance": [
    { "date": "2024-08-01", "status": "Present" },
    { "date": "2024-08-02", "status": "Absent" }
    ],
    "totalClasses": 2,
    "presentClasses": 1,
    "attendancePercentage": 50
    },
    {
    "subjectName": "Physics",
    "subjectCode": "PHYS101",
    "attendance": [
    { "date": "2024-08-01", "status": "Present" },
    { "date": "2024-08-02", "status": "Present" }
    ],
    "totalClasses": 2,
    "presentClasses": 2,
    "attendancePercentage": 100
    }
    ]

        }
        ```
    

### Marks Management

- **POST /api/marks**: Add marks for students in a specific class.

  - Request Body:
    ```json
    {
      "student": "student_id",
      "class": "class_id",
      "marks": 85
    }
    ```
  - Response:
    ```json
    {
      "message": "Marks recorded successfully"
    }
    ```

- **GET /api/marks/:userId**: Get marks for a specific student.

  - Response:
    ```json
    {
    "marks": [
    {
    "subjectName": "Mathematics",
    "subjectCode": "MATH101",
    "marks": [
    {
    "marks1": 85
    },
    {
    "marks2": 90
    }
    ]
    },
    {
    "subjectName": "Physics",
    "subjectCode": "PHY102",
    "marks": [
    {
    "marks1": 75
    },
    {
    "marks2": 80
    }
    ]
    },
    {
    "subjectName": "Computer Science",
    "subjectCode": "CSE103",
    "marks": [
    {
    "marks1": 95
    },
    {
    "marks2": 98
    }
    ]
    }
    ]

        }
        ```

## Deployment

To deploy the application, you can follow these steps:

1. **Install Dependencies**:

   ```bash
   npm install
   cd client
   npm install
   ```

2. **Environment Setup**:

   - Create a `.env` file in the root of your project.
   - Add environment variables such as `JWT_SECRET`, `DB_URI`, etc.

3. **Run the Backend**:

   ```bash
   npm start
   ```

4. **Run the Frontend**:
   ```bash
   cd client
   npm start
   ```

## Future Enhancements

- **Notifications**: Add a notification system to alert students and teachers about important updates (e.g., new assignments, attendance issues).
- **Reports**: Generate various reports for admin and faculty (e.g., attendance reports, marks analysis).
- **Role-based Access Control**: Implement more granular permissions for different roles.

## Conclusion

This College Management System provides a comprehensive solution to manage various academic operations in a college. The MERN stack offers a scalable and flexible framework, allowing for future expansions and enhancements as needed.
