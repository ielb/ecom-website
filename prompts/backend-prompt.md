# E-commerce Backend API Development Prompt

## Project Overview

Develop a RESTful API backend service for an e-commerce platform that integrates with the existing React frontend. The frontend is built with Next.js and uses axios for API communication. The backend should support all existing frontend functionality while maintaining a clean architecture and following best practices.

## API Base URL and Configuration

The frontend is configured to communicate with a backend server at:

- Base URL: `http://localhost:3030/v1`
- All endpoints should be prefixed with this base path

## Authentication Requirements

Implement a secure authentication system that:

1. Supports JWT token-based authentication
2. Provides the following endpoints:
   - `POST /auth/login` - Authenticates users with email/password
   - `POST /auth/register` - Creates new user accounts
   - `POST /auth/reset-password` - Initiates password reset process
   - `PUT /user/change-password` - Updates user password (authenticated)

For JWT tokens:

- They should be returned in the response body as `{ token: "token_value", user: {...} }`
- Tokens should be validated via an Authorization header: `Authorization: Bearer <token>`

## User Management

Implement user profile management with these endpoints:

- `PUT /user/profile` - Updates user profile information
- Receives: `{ firstName, lastName, phoneNumber }`

## Address Management

Implement address management for user shipping/billing addresses:

- `POST /user/addresses` - Creates a new address
- `PUT /user/addresses/:id` - Updates an existing address
- `DELETE /user/addresses/:id` - Removes an address

Addresses should include:

```
{
  id: string
  name: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}
```

## Payment Methods

Implement payment method management:

- `POST /user/payment-methods` - Adds a new payment method
- `DELETE /user/payment-methods/:id` - Removes a payment method
- `PUT /user/payment-methods/:id/default` - Sets a payment method as default

Payment methods should include:

```
{
  id: string
  type: "card" | "paypal"
  lastFour?: string (for cards)
  cardBrand?: string (for cards)
  expiryDate?: string (for cards)
  isDefault: boolean
}
```

## Products

Implement product management with these endpoints:

- `GET /products` - Lists products with optional filters for category, search, price range
- `GET /products/:id` - Gets detailed product information
- `GET /products/featured` - Lists featured products for homepage
- `GET /products/categories` - Lists all product categories

## Orders

Implement order management:

- `POST /orders` - Creates a new order
- `GET /orders` - Lists a user's orders
- `GET /orders/:id` - Gets detailed order information

## Cart Management

Implement shopping cart functionality:

- `GET /cart` - Gets the current user's cart
- `POST /cart/items` - Adds an item to cart
- `PUT /cart/items/:id` - Updates cart item quantity
- `DELETE /cart/items/:id` - Removes an item from cart
- `DELETE /cart` - Clears the entire cart

## Reviews

Implement product review functionality:

- `POST /products/:id/reviews` - Adds a review to a product
- `GET /products/:id/reviews` - Gets reviews for a product

## Technical Requirements

1. **Authentication & Security**
   - Implement JWT token validation
   - Implement proper password hashing
   - Rate limiting for sensitive endpoints
2. **Database**
   - Use MongoDB, PostgreSQL, or MySQL
   - Include seed data for testing
   - Design efficient schemas with proper relations
3. **API Design**

   - RESTful API design
   - Consistent error handling and status codes
   - Comprehensive input validation
   - Pagination for list endpoints

4. **Error Handling**

   - Return appropriate HTTP status codes
   - Provide meaningful error messages
   - Follow this structure for errors:
     ```
     {
       "error": true,
       "message": "Descriptive error message",
       "details": {} // Optional additional information
     }
     ```

5. **Response Format**
   - For successful operations, use:
     ```
     {
       "data": {...} // Response data
     }
     ```
   - For list endpoints, include pagination:
     ```
     {
       "data": [...],
       "pagination": {
         "total": 100,
         "page": 1,
         "perPage": 10,
         "totalPages": 10
       }
     }
     ```

## Bonus Features

1. **Wishlist Management**

   - Endpoints to add/remove products from wishlist
   - Retrieve user's wishlist

2. **Analytics**

   - Track popular products
   - Record user browsing history

3. **Search**

   - Implement full-text search for products
   - Support filtering and sorting options

4. **Payment Integration**
   - Mock integration with payment processors
   - Support for multiple payment methods

## Development Guidelines

1. Use a modern backend framework (Express.js, NestJS, Django, Flask, etc.)
2. Write clean, maintainable code with proper comments
3. Implement comprehensive automated tests
4. Document all endpoints with example requests/responses
5. Implement proper logging
6. Set up a development environment with Docker
7. Include error handling middleware
8. Implement request validation

## Deliverables

1. Source code for the backend API
2. Database schema and migration scripts
3. API documentation (Swagger/OpenAPI preferred)
4. Setup and deployment instructions
5. Test suite with good coverage
6. Sample environment configuration

## Evaluation Criteria

The backend implementation will be evaluated based on:

1. Code quality and organization
2. API design and usability
3. Security implementation
4. Performance and scalability considerations
5. Test coverage
6. Documentation quality
7. Error handling robustness
