# My Express REST API with JWT Authentication

This project is a simple demonstration of how to create a RESTful API using Mysql,Node.js and Express, with JSON Web Token (JWT) authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation
### Postman
Here's a section for your README file to provide brief information about downloading and configuring Postman to test your API:

---

## Postman Download and Configuration

### Downloading Postman

Postman is a popular API client that makes it easy to test and develop APIs. You can download Postman from the following link:

- [Download Postman](https://www.postman.com/downloads/)

### Installing Postman

1. **Windows**: Run the downloaded installer and follow the on-screen instructions.
2. **macOS**: Drag the Postman app to your Applications folder.
3. **Linux**: Follow the installation instructions for your specific distribution.

### Configuring Postman

Once Postman is installed, follow these steps to configure it for testing your API:

1. **Open Postman**: Launch the Postman application.

2. **Create a New Collection**:
    - Click on `Collections` in the sidebar.
    - Click the `New Collection` button.
    - Name your collection (e.g., "My Express API").
    - Create two folders `Pre Authorization` and `Post Authorization`.


3. **Add Requests to the Collection**:
    - Click on your newly created collection.
    - Click `Add Requests`.

4. **Set Up Request Details**:
    - **Register User**:
        - Method: `POST`
        - URL: `http://localhost:3000/api/auth/register`
        - Body: Select `raw` and `JSON` and enter the following:
            
            {
                "username": "example",
                "password": "password123"
            }
            
    - **Login User**:
        - Method: `POST`
        - URL: `http://localhost:3000/api/auth/login`
        - Body: Select `raw` and `JSON` and enter the following:
          
            {
                "username": "example",
                "password": "password123"
            }

5. **Save Requests**: After configuring each request, click the `Save` button.

6. **Test Requests**: Click the `Send` button to test each request. Verify the responses to ensure your API is working correctly.


### Installing Workbench

Here's a section for your README file to provide brief information about downloading and configuring MySQL for your project:

---

## MySQL Download and Configuration

### Downloading MySQL

MySQL is a popular relational database management system. You can download MySQL from the following link:

- [Download MySQL](https://dev.mysql.com/downloads/)

### Installing MySQL

1. **Windows**:
    - Run the downloaded MySQL installer.
    - Follow the on-screen instructions to complete the installation.
    - During the installation process, you will be prompted to configure the MySQL server and set a root password.

2. **macOS**:
    - Run the downloaded MySQL installer.
    - Follow the on-screen instructions to complete the installation.
    - After installation, start the MySQL server from System Preferences or by using the terminal command:
      ```bash
      sudo mysql.server start
      ```

3. **Linux**:
    - Use your distribution's package manager to install MySQL. For example, on Ubuntu:
      ```bash
      sudo apt update
      sudo apt install mysql-server
      ```
    - Start the MySQL server:
      ```bash
      sudo systemctl start mysql
      ```
    - Secure the installation and set a root password:
      ```bash
      sudo mysql_secure_installation
      ```

### Configuring MySQL

1. **Access MySQL**:
    - Open a terminal or command prompt.
    - Log in to the MySQL server using the root account:
     
     

2. **Create a Database**:
    - Create a new database and table for your project:
    
      CREATE DATABASE APIM;
      create table login(username varchar(20) not null primary key,password varchar(20) not null );
      create table demo (ID int primary key,name varchar(20),gender varchar(20), bloodgroup varchar(10),  username varchar(20),FOREIGN KEY (username) REFERENCES login(username) ON DELETE CASCADE);

### Connecting Your Application to MySQL

Ensure your Node.js application is set up to connect to the MySQL database. You can use the `mysql` package for this purpose:

1. **Install the MySQL Package**:
   
    npm install mysql
   

2. **Set Up the Database Connection**:
    - In your `config/database.js` file:
      
      const mysql = require('mysql');
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "demo"
      });

      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to the database:', err.stack);
          return;
        }
        console.log('Connected to the database as ID', connection.threadId);
      });

      module.exports = connection;
      

3. **Use the Database Connection**:
    - In your application files where you need to interact with the database, require the connection:
      
      const db = require('./config/mysql2');

      // Example query
      db.query('SELECT * FROM demo', (err, results) => {
        if (err) {
          console.error('Error executing query:', err.stack);
          return;
        }
        console.log('Query results:', results);
      });
     

This setup will help you get MySQL up and running for your project and ensure your Node.js application can connect to the database.


### GIT and NodeJs:

1. Clone the repository:
    git clone https://github.com/YashM150/REST-API-Database.git

2. Navigate to the project directory:
   
    cd REST-API-DATABASE
    
3. Install the dependencies:
 
    npm init
    npm i express
    npm install express mysql2 jsonwebtoken bcryptjs body-parser
    npm install oauth2-server body-parser




## Usage

1. Start the server:
    
    npm start
    
2. The server will start on the port  3000.

## API Endpoints

### Authentication
- **POST /api/registeruser**
    - Registers a new user
    - Request body:
        {
          "username":"Yash123",
          "password":"qwerty"
        }
       

- **POST /api/login**
    - Logs in a user and returns a JWT
    - Request body:
       
        {
          "username":"Yash123",
          "password":"qwerty"
        }
       

### Protected Routes

- **GET /api/users**
    - Get Information of all the Users
    - Header:
        {
            "Authorization": "Bearer <your_jwt_token>"
        }
- **GET /api/user/findUser/:id**
    - Get Information of a particular User
    - Header:
        {
            "Authorization": "Bearer <your_jwt_token>"
        }
- **POST /api/user/AddInfo**
    - ADD Information of a User
    - Header:
        {
            "Authorization": "Bearer <your_jwt_token>"
        }
    - Body:
          {  
               "name":"name",
               "gender":"gender",
               "bloodgroup":"Bloodgroup",
               "username":"username"
          }
- **DELETE /api/user/deleteUser/:username**
    - Delete Information of a User
    - Header:
        {
            "Authorization": "Bearer <your_jwt_token>"
        }

- **PATCH /api/user/UpdateInfoPartially/:id**
    - Partially Update Information of a User as per requirenment.
    - Header:
        {
            "Authorization": "Bearer <your_jwt_token>"
        }
    - Body :
          {
               "gender":"gender",
               "bloodgroup": "Bloodgroup"
          }

- **PUT /api/user/UpdateInfo/:id**
    - Partially Update Information of a User as per requirenment.
    - Header:
        {
            "Authorization": "Bearer <your_jwt_token>"
        }
    - Body :
          {
                "Name":"name",
               "gender":"gender",
               "bloodgroup": "bloodgroup"
          }

## Project Structure

.
├── .env
├── .gitignore
├── .gitattributes
├── README.md
├── package.json
├── packagelock.json
├── app.js
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   └── crudController.js
├── middlewares
│   └── authMiddleware.js
├── models
│   ├──userModel.js
│   └── crudModel.js
└── routes
    └──authRoutes.js


- **app.js**: Entry point of the application.
- **config/db.js**: Database configuration.
- **controllers/**: Contains the logic for handling requests.
- **middlewares/**: Middleware functions for authentication and other purposes.
- **models/**: Database models.
- **routes/**: Defines the endpoints and maps them to controller functions.

## Technologies Used

- Node.js
- Express.js
- JSON Web Token (JWT)
- MYSQL
## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Other Important Points

Node Modules are not included in the repository.
In this repo we have established connection with SQL server.
Have to download sql workbench in the system.
Always give parameters to qury syntax as array.

Login Table:
     --------------------------------
    |   Username    |   Password    |
     -------------------------------
    |   Pratik345   |   poiuyt      |
    |   Yash123     |   qwerty      |
    |   Saurabh345  |   mnbvc       |
    |   Nisha345    |   zxcvb       |
    |   Anshuk234   |   asdfg       |
    ---------------------------------


    Tasks completed:
    
    1. Get all Users.
    2. get particular User.
    3. Add a user.
    4. Delete a user.
    5. Partially Update a user.
    6. Update a user.

    Implement :
    1. JWT
    2. OAuth