# politico
Politico- A web application that enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

# Features
* A User can:
  * create an account
  * login into the application
  * vote for only one politician per political office
  * can see the result of an election
* An Admin user can:
  * create and edit a political party
  * create a political office
  * view the list of political parties created

# Templates
The templates for the frontend of this project can be viewed [here](https://bobjayafam.github.io/politico/UI)

# Technologies
This project makes use of `HTML` and `CSS` for the UI templates, [NodeJs](https://www.nodejs.org) and [Express](https://www.expressjs.com) framework for the backend, a [cloudinary](https://www.cloudinary.com) account for uploading images to the cloud and data structures to store data in memory

# How to run locally
With Node installed, take the following steps to have the project on your local machine
1. Clone the repository from a command line `git clone https://github.com/bobjayafam/politico.git`
2. Navigate to the project directory `cd politico`
3. Run npm install to install project dependencies
4. Change `.env.example` to `.env` and provide the necessary credentials. The cloudinary credentials (cloud_name, api_key and api_secret) can obtained by opening a free cloudinary account.
5. Run `npm start` to start the application

# Testing
- Run `npm test`

# API Endpoints
EndPoint                      |   Functionality
------------------------------|------------------------
POST /parties                 |   Create a political party
GET /parties/:id              |   Fetch a specific political party
GET /parties                  |   Fetch all political parties record
PATCH /parties/:id/name       |   Edit the name of a political party
DELETE /parties/:id           |   Deletes a specific political party
POST /offices                 |   Create a political office
GET /offices                  |   Fetch all political offices
GET /offices/:id              |   Fetch a specific political office

# Author
Jude Afam https://github.com/bobjayafam

# License
MIT


