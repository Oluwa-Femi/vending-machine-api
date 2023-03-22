# VENDING MACHINE API

## BRIEF
Design a fully functional REST API for a vending machine, allowing users with a “seller” role to add, update or remove products, while users with a “buyer” role can deposit coins into the machine and make purchases

## Deployment Link
- 

## Repository Link
- `https://github.com/Oluwa-Femi/vending-machine-api`

## Architecture Document
- `https://docs.google.com/document/d/11A7MFC8NlnE9goqhk7Qq3Grl3DyQTwWV3DnNycKWoZ8/edit`

## Technology
- NodeJs(Typescript)
- MongoDb
- Express
- File format - JSON

## Project Structure

## Documentation
Postman -
Swagger - 

## Instructions - Local set-up
In the terminal, you can:
* `cd` into your preferred folder
* run git clone `https://github.com/Oluwa-Femi/vending-machine-api`
* cd `vending-machine-api`
* create a `.env` file in the root directory replicating the keys in the `sample.env` file. Attach values to the keys or just dump the sample file in the `.env`. 
* run `npm install` - to set up Node modules and install packages
* run `npm run dev` - to spin the application
* use an API tester e.g Postman to run the routes

## Instructions - Deployed Link

## Test
- Ensure you are in the `vending-machine-api` folder
- Run `npm run test` in the terminal

## MVP
- [x] Set up repo
- [x] Initialize
- [x] REST API should be implemented consuming and producing “application/json”
- [ ] Implement product model with amountAvailable, cost (should be in multiples of 5), productName and sellerId fields
- [x] Implement user model with username, password, deposit and role fields
- [x] Implement an authentication method (basic, oAuth, JWT or something else, the choice is yours)
- [x] All of the endpoints should be authenticated unless stated otherwise
- [x] Implement CRUD for users (POST /user should not require authentication to allow new user registration)
- [*] Implement CRUD for a product model (GET can be called by anyone, while POST, PUT and DELETE can be called only by the seller user who created the product)
- [*] Implement /deposit endpoint so users with a “buyer” role can deposit only 5, 10, 20, 50 and 100 cent coins into their vending machine account (one coin at the time)
- [*] Implement /buy endpoint (accepts productId, amount of products) so users with a “buyer” role can buy a product (shouldn't be able to buy multiple different products at the same time) with the money they’ve deposited. API should return total they’ve spent, the product they’ve purchased and their change if there’s any (in an array of 5, 10, 20, 50 and 100 cent coins)
- [*] Implement /reset endpoint so users with a “buyer” role can reset their deposit back to 0
- [ ] Take time to think about possible edge cases and access issues that should be solved
- [ ] Write tests
- [ ] Clean up, keep all environment variables in env, make sure variable and function names are descriptive,

## Stretch Goals
- [x] Set up an audit trail system with logger
- [x] If somebody is already logged in with the same credentials, the user should be given a message "There is already an active session using your account". In this case the user should be able to terminate all the active sessions on their account via an endpoint i.e. /logout/all
- [ ] Security - Encryption/Decryption - x-request-from
- [ ] Push notifications with socket


