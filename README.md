# Blog-platform Backend

A Blog platform backend built to demonstrate JWT authentication, posts CRUD with draft/publish workflow, owner-only access control, and image upload support using **Cloudinary**.

---

## Tech Stack

- Node.js (`v18+`)
- Express.js (`v5`)
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image storage)
- Multer (file uploads)
- Joi (request validation)

---

## Features

### Authentication & Authorization (JWT)

- User registration & login
- JWT-based authentication (protected routes)
- User identity extracted from JWT token
- Owner-only access control (only post owners can update/delete their post)

### Posts (CRUD + Draft/Publish)

- Create post
- Get all posts
- Get single post by ID
- Update post (only owner)
- Delete post (only owner)
- Draft & publish support
  - Posts can be created as draft
  - Posts can be updated to published

### Image Upload (Cloudinary)

- Cloudinary configuration added
- Image upload service added
- Supports uploading post images via backend
- Multer memory sorage support (upload from request and then Cloudinary)

---

## API Endpoints

### Auth

- `POST /auth/register`:- create a new user
- `POST /auth/login`:- login and get JWT token
- `POST /auth/logout`:- logout

### Posts

- `POST /user/posts`:- create a post (**JWT required**)
- `GET /user/posts`:- get all posts (**JWT required**)
- `GET /user/posts/:id`:- get a single post by ID (**JWT required**)
- `PATCH /user/posts/:id`:- update a post (**JWT required**)
- `DELETE /user/posts/:id`:- delete a post (**JWT required**)

- `GET /posts`:- get all public posts (**no JWT required**)
- `GET /posts/:id`:- get a single public post by ID (**no JWT required**)

---

## Post Flow (Draft to Published)

1. User creates a post (default status: draft)
2. User can update post content anytime (only owner)
3. User can change status from draft to published (only owner)
4. Published posts are visible to all users
5. Draft posts are only visible to the owner

---

## Security Notes

- JWT token is required for all protected routes
- User ID is extracted from JWT token (not from frontend)
- Only the post owner can update/delete their post
- Image uploads are validated using multer + backend logic

---

## Folder Structure

```text
blog-platform-backend/
├── src/
│   ├── configs/
│   ├── controllers/
│   ├── errors/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Environment Variables

```bash
PORT=
NODE_ENV=
MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Status

**Completed** (Auth + Posts CRUD + Draft/Publish + Owner Only Access Control + Image Upload)
