# Vetly Company Website

## Project Description

Vetly is a veterinary company website backend developed as part of my
Grazac Back-End Web Development Challenge.

The project provides APIs that allow users to register, log in, view
available pets, and purchase pets.

The system also provides administrative functionality that allows an
authorized administrator to add new pets, edit existing pet information,
and remove pets from the database.

The application uses JWT authentication to secure the API endpoints,
while role-based authorization is used to restrict administrative
operations.

---

## Features

The Vetly backend provides the following features:

- User registration
- User login
- JWT authentication
- Protected API endpoints
- Admin authorization using `ROLE_ADMIN`
- Programmatic admin account creation
- Create new pets
- Edit existing pet information
- Delete pets using their ID
- View available pets
- Pet purchase functionality
- Automatic reduction of pet quantity after purchase
- Pet image upload using Multer and Cloudinary
- MongoDB database integration
- Postman API documentation

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Multer
- Cloudinary
- dotenv
- Postman
- Git and GitHub

---

## Project Structure

The project follows separation of concerns so that each part of the
application has a specific responsibility.

```text
VetlyGrazac/
│
├── src/
│   ├── config/
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   │   ├── petController.js
│   │   └── userController.js
│   │
│   ├── db/
│   │   └── database.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── petModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── petRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── seeders/
│   │   └── adminSeeder.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── app.js
│   └── server.js
│
├── ARTICLE.md
├── README.md
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```


## Postman API Documentation

You can view the complete API documentation here:

[View Vetly Postman Documentation]

``
(https://documenter.getpostman.com/view/56988360/2sBYB2rnEy)

``


## Deployment

The API is deployed and publicly accessible.

### Live API

https://grazac-general-challenge.onrender.com

### Example Endpoint

https://grazac-general-challenge.onrender.com/api/classify-number?number=371