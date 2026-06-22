# LYNK

## Class Management System

This project is a class management system designed to organize courses, classes, disciplines, competencies, lessons, exams, users, and learning materials within an educational environment.

The application has a frontend built with Node.js and a backend developed with TypeScript, providing a structured and scalable architecture for managing educational content and user interactions.

The system uses a relational database to store structured data, such as users, courses, classes, disciplines, lessons, and relationships between entities. File-based resources, such as PDFs, DOCX documents, images, and profile photos, can be stored separately using MongoDB/GridFS or another file storage solution, while the relational database stores only the file reference.

The goal of this project is to provide an organized platform where administrators, instructors, and students can manage and access educational information according to their roles.

### Main Features

- User management with different roles, such as student, instructor, and administrator
- Course, class, and discipline organization
- Lesson and competency management
- Upload and management of learning materials
- Exam registration and organization
- File storage integration for documents and images
- System log structure for auditing user actions
- Relational database modeling focused on consistency and scalability

### Technologies

- Node.js for the frontend environment
- TypeScript for the backend
- SQL database for structured system data
- MongoDB/GridFS or external storage for files and documents
- API-based architecture
- Authentication and role-based access control
