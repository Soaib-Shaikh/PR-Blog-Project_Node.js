# Blog-Project 

A full-featured blogging platform built with Node.js, Express, MongoDB, and Cloudinary for image management. This project allows users to create, edit, delete, and view blog posts with images stored locally and on Cloudinary.

**Live Demo:**  
Deploy Link:- 


# Output:
1. Signup page

![alt text](./output/signup.png)

2. loginup page

![alt text](./output/login.png)

3. Home page

![alt text](./output/Home.png)

4. createBlog page

![alt text](./output/createBlog.png)

5. editBlog page

![alt text](./output/editBlog.png)

6. viewSingleBlog page

![alt text](./output/viewSingleBlog.png)

7. deleteBlog page

![alt text](./output/deleteBlog.png)

8. Myprofile page

![alt text](./output/Myprofile.png)
## Features

- User authentication and session management
- Create, read, update, and delete (CRUD) blog posts
- Upload blog post cover images stored locally and on Cloudinary
- Like and comment on blog posts
- User authorization for editing and deleting posts
- Responsive UI rendered with EJS templates
- Image upload handling with Multer and Cloudinary SDK

---

## Folder Structure

```
/project-root
├── /configs # Configuration files (Cloudinary, DB, etc.)
├── /controllers # Controller files for business logic (postController.js)
├── /middlewares # Middlewares like upload handlers (multer)
├── /models # Mongoose schemas: User, Post
├── /public # Static files + local uploads
│ └── /uploads # Locally stored images
├── /routers # Route definitions
├── /views # EJS templates for rendering pages
│ ├── /pages
│ │ ├── /blog # Blog related views
│ │ └── /writer # Writer views
├── app.js # Main Express app setup and entry point
├── package.json # Node dependencies and scripts
└── README.md # This file


## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Soaib-Shaikh/PR-Blog-Project_Node.js.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   DB_URL=mongodb+srv://soaibshaikh:12345@blog-project.e6ptai6.mongodb.net/blog_project
   SESSION_SECRET=soaib1002
   CLOUDINARY_CLOUD_NAME=dav5tpyet
   CLOUDINARY_KEY=213397776336737
   CLOUDINARY_SECRET=vly7gGGczXqMYiEXMa2GLQnvFJ0
   ```
4. Run the application:
   ```bash
   npm start
   ```
5. Access the app at `http://localhost:8081`.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB and Mongoose for database
- EJS templating engine for rendering views
- Multer for handling file uploads
- Cloudinary for image hosting and transformations
- Express-session for session management
- JavaScript (ES6+)
- HTML5, CSS3, Bootstrap (for UI styling)

---

## Usage

- Register or login to create, edit, and delete your blog posts.
- Upload images with posts that will be saved locally and on Cloudinary.
- View all posts, like them, and add comments.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

