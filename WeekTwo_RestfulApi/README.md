# Contacts API

A simple API for managing a list of contacts. You can add, view, update, and delete contacts.

## Getting Started

1. Install the dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```
3. The API will be running at `http://localhost:8080`

## What It Can Do

| Action | Endpoint |
|---|---|
| Get all contacts | `GET /v1/contacts` |
| Get one contact | `GET /v1/contacts/:id` |
| Add a new contact | `POST /v1/contacts` |
| Update a contact | `PUT /v1/contacts/:id` |
| Delete a contact | `DELETE /v1/contacts/:id` |

## Running Tests

```
npm test
```
