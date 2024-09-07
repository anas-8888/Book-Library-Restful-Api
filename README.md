# Book Library API

The Book Library API is a simple RESTful API for managing a library of books, authors, and categories. This API is built using Node.js, Express, and Sequelize ORM, with a MySQL (or other supported SQL) database.

## Project Structure

```
book-library-api/
├── app.js
├── config/
│   └── db.config.js
├── controllers/
│   ├── book.controller.js
│   ├── author.controller.js
│   └── category.controller.js
├── models/
│   ├── index.js
│   ├── book.model.js
│   ├── author.model.js
│   └── category.model.js
├── routes/
│   ├── book.routes.js
│   ├── author.routes.js
│   └── category.routes.js
└── package.json
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MySQL (or another SQL-based database)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd book-library-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add your database credentials:

In the `config/db.config.js` file, update the database configuration to match your environment:

```makefile
DB_PASS=your_database_password
PORT=your_port
```

Make sure to replace your_database_password with your actual MySQL password

4. Run database migrations and start the server:

```bash
npm start
```

The server will run on port 2500 by default. You can change the port by setting the PORT environment variable in your .env file.

### Running the Project

After setting up and running the project, the API will be available at:

```
http://localhost:2500
```

You can test the API using tools like Postman, Swagger, or your browser.

## Available Endpoints

### Books

- **GET /api/books**

  Retrieve all books with optional filtering by author or category using query parameters:

  - `authorID` (optional): Filter books by a specific author.
  - `categoryID` (optional): Filter books by a specific category.

  **Example Request:**

  ```bash
  GET /api/books?authorID=1&categoryID=2
  ```

- **GET /api/books/:ID**

  Retrieve a specific book by its ID.

  **Example Request:**

  ```bash
  GET /api/books/1
  ```

- **POST /api/books**

  Add a new book.

  **Request Body:**

  ```json
  {
    "title": "The Great Book",
    "authorID": 1,
    "categoryID": 2,
    "publishedDate": "2024-01-01"
  }
  ```

- **PUT /api/books/:ID**

  Update an existing book by its ID.

  **Request Body:**

  ```json
  {
    "title": "Updated Book title",
    "authorID": 1,
    "categoryID": 3,
    "publishedDate": "2024-02-01"
  }
  ```

- **DELETE /api/books/:ID**

  Delete a book by its ID.

### Authors

- **GET /api/authors**

  Retrieve all authors.

- **GET /api/authors/:ID**

  Retrieve a specific author by their ID.

- **POST /api/authors**

  Add a new author.

  **Request Body:**

  ```json
  {
    "name": "John Doe"
  }
  ```

- **PUT /api/authors/:ID**

  Update an existing author by their ID.

  **Request Body:**

  ```json
  {
    "name": "Jane Doe"
  }
  ```

- **DELETE /api/authors/:ID**

  Delete an author by their ID.

### Categories

- **GET /api/categories**

  Retrieve all categories.

- **GET /api/categories/:ID**

  Retrieve a specific category by its ID.

- **POST /api/categories**

  Add a new category.

  **Request Body:**

  ```json
  {
    "name": "Science Fiction"
  }
  ```

- **PUT /api/categories/:ID**

  Update an existing category by its ID.

  **Request Body:**

  ```json
  {
    "name": "Fantasy"
  }
  ```

- **DELETE /api/categories/:ID**

  Delete a category by its ID.

## Database Models

The project includes three main models:

- **Book**: Represents a book in the library.
- **Author**: Represents an author of the books.
- **Category**: Represents a category or genre for books.

These models are associated using Sequelize relationships, allowing the API to handle complex queries and filtering.