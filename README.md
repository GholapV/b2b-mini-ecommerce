#### Setup

npm install && npm start

#### Database Connection (MONGO-Atlas)

1. Setup .env in the root
2. Add MONGO_URI with correct value

#### JWT

JWT for generating registration and login token

#### Password encryption and Match

bcrypt.js

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Custom Errors

- Bad Request
- Not Found
- UnAuthorized

#### Security

- helmet
- cors
- xss-clean

#### Documentation

Swagger Yaml

#### Hosted Project

[E-Commerce API Heroku URL](https://b2b-mini-ecommerce.herokuapp.com/)

#### FLOW

- Owner first registers himself, only he can add products to the store.
- Products in the store can be accessed by everyone
- Users register himself and adds products from the store to the cart.
- User can see the cart
- Then user places order and cart gets emptied
- User can see the placed orders.
- Owner can see the orders received.
