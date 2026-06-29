# Organization - Backend

# Use Cases

## Authentication - Anna

### POST
- Login user
- Refresh access token
- Logout user

### GET
- Get authenticated user


## User - Thais

### POST
- Create user

### GET
- List users
- View user profile

### DELETE
- Delete user

### PUT
- Edit user profile
- Change user password

## Class - Anna

### POST
- Create class
- Assign competency to class
- Attach file to class

### GET
- List classes
- View class
- List class materials
- List class competencies
- Download all the class files
- Download class content

### DELETE
- Delete lesson
- Remove competency from class
- Remove attachment from class

### PUT
- Edit classes

## Area - Thais

### POST
- Create area

### GET
- List area
- View area
- List courses by area

### DELETE
- Delete area

### PUT
- Edit area


## Discipline - Anna

### POST
- Create discipline
- Assign competency to discipline

### GET
- List disciplines
- View discipline
- List discipline classes
- List discipline materials
- List discipline competencies

### DELETE
- Delete discipline
- Remove competency from discipline

### PUT
- Edit discipline


## Competency - Thais

### POST
- Create competency
- Assign competency to discipline
- Assign competency to classes

### GET
- List competencies
- View competency

### DELETE
- Delete competency
- Remove competency from discipline
- Remove competency from class

### PUT
- Edit competency

## Material - Anna

### POST
- Create material
- Upload material file
- Attach material to class
- Attach material to discipline

### GET
- List materials
- View material
- Download material file

### DELETE
- Delete material
- Remove material from class
- Remove material from discipline

### PUT
- Edit material
- Replace material file

## Exam - Thais

### POST
- Create exam
- Attach file to exam

### GET
- List exams
- View exam
- Download exam attachment

### DELETE
- Delete exam

### PUT
- Edit exam

## System Log - Thais

### GET
- List system logs
- View log details
- Filter logs by user
- Filter logs by action
- Filter logs by entity

# Services
### FindbyId
### DeletebyId
### GetAll
### GetById
### Create
### Update
