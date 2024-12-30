# Tekweb Aldi API

This API allows you to perform CRUD operations on two categories of books: normal books and best seller books. The API is built using Express.js and Firebase Firestore.

## Setup

1. Clone the repository.
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Add your Firebase service account key JSON file to the `path to serviceAccountKey.json`.
4. Start the server:
    ```bash
    npm start
    ```

## Endpoints

### Normal Books

#### Create a new normal book
- **URL:** `/normalBooks`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "title": "string",
      "author": "string",
      "category": "string",
      "rating": number,
      "price": number,
      "description": "string",
      "image": "string"
    }
    ```
- **Response:**
    ```json
    {
      "message": "Created a new normal book: {id}"
    }
    ```

#### Read all normal books
- **URL:** `/normalBooks`
- **Method:** `GET`
- **Response:**
    ```json
    [
      {
        "id": "string",
        "title": "string",
        "author": "string",
        "category": "string",
        "rating": number,
        "price": number,
        "description": "string",
        "image": "string"
      },
      // ...more books
    ]
    ```

#### Read a single normal book by ID
- **URL:** `/normalBooks/:id`
- **Method:** `GET`
- **Response:**
    ```json
    {
      "id": "string",
      "title": "string",
      "author": "string",
      "category": "string",
      "rating": number,
      "price": number,
      "description": "string",
      "image": "string"
    }
    ```

#### Update a normal book by ID
- **URL:** `/normalBooks/:id`
- **Method:** `PUT`
- **Body:**
    ```json
    {
      "title": "string",
      "author": "string",
      "category": "string",
      "rating": number,
      "price": number,
      "description": "string",
      "image": "string"
    }
    ```
- **Response:**
    ```json
    {
      "message": "Normal book updated"
    }
    ```
- **Note:** At least one field must be provided in the body to update the book.

#### Delete a normal book by ID
- **URL:** `/normalBooks/:id`
- **Method:** `DELETE`
- **Response:**
    ```json
    {
      "message": "Normal book deleted"
    }
    ```

### Best Seller Books

#### Create a new best seller book
- **URL:** `/bestSellerBooks`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "title": "string",
      "author": "string",
      "category": "string",
      "rating": number,
      "price": number,
      "description": "string",
      "image": "string"
    }
    ```
- **Response:**
    ```json
    {
      "message": "Created a new best seller book: {id}"
    }
    ```

#### Read all best seller books
- **URL:** `/bestSellerBooks`
- **Method:** `GET`
- **Response:**
    ```json
    [
      {
        "id": "string",
        "title": "string",
        "author": "string",
        "category": "string",
        "rating": number,
        "price": number,
        "description": "string",
        "image": "string"
      },
      // ...more books
    ]
    ```

#### Read a single best seller book by ID
- **URL:** `/bestSellerBooks/:id`
- **Method:** `GET`
- **Response:**
    ```json
    {
      "id": "string",
      "title": "string",
      "author": "string",
      "category": "string",
      "rating": number,
      "price": number,
      "description": "string",
      "image": "string"
    }
    ```

#### Update a best seller book by ID
- **URL:** `/bestSellerBooks/:id`
- **Method:** `PUT`
- **Body:**
    ```json
    {
      "title": "string",
      "author": "string",
      "category": "string",
      "rating": number,
      "price": number,
      "description": "string",
      "image": "string"
    }
    ```
- **Response:**
    ```json
    {
      "message": "Best seller book updated"
    }
    ```
- **Note:** At least one field must be provided in the body to update the book.

#### Delete a best seller book by ID
- **URL:** `/bestSellerBooks/:id`
- **Method:** `DELETE`
- **Response:**
    ```json
    {
      "message": "Best seller book deleted"
    }
    ```

## Example Requests

### Create a new normal book
```bash
curl -X POST http://localhost:3000/normalBooks -H "Content-Type: application/json" -d '{
  "title": "The Problem with Forever",
  "author": "Jennifer L. Armentrout",
  "category": "Romance",
  "rating": 4.8,
  "price": 75000,
  "description": "A moving story about friendship, survival, and finding your voice.",
  "image": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562769688l/26721568.jpg"
}'
```

### Read all best seller books
```bash
curl -X GET http://localhost:3000/bestSellerBooks
```

### Update a normal book by ID
```bash
curl -X PUT http://localhost:3000/normalBooks/1 -H "Content-Type: application/json" -d '{
  "title": "The Problem with Forever",
  "author": "Jennifer L. Armentrout",
  "category": "Romance",
  "rating": 4.8,
  "price": 75000,
  "description": "A moving story about friendship, survival, and finding your voice.",
  "image": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562769688l/26721568.jpg"
}'
```

### Delete a best seller book by ID
```bash
curl -X DELETE http://localhost:3000/bestSellerBooks/1
```
