### Steps to Create Backend with DB

1. Generate package.json
2. Create express server
3. Install mongoose and connect to MongoDB server

        REST API  ----MongoDB native driver-->DB Server
        REST API  ----Mongoose ODM tool-->DB Server

4. Build USER REST API
                - Create User
                - Read all users
                - Read a User by ID
                - Update a User by ID
                - Delete a User by ID

5. Create Schema and Model of the Resource(User)

6. Create USER API and define routes

--> Handling unavailable resources
--> Validators during update
--> Hashing password (bcryptjs)
--> Unique fields
--> Refined version of error handling middleware

hello--->sdfsodfhsjbdfs894793875jb34598fgdjbfvfd--->hello
hello--->sdfbsdf7df6s7dfnbdf87sdf









### User Authentication(Login)
        -Submit credentials and get token


        req-----> Public routes (By anyone)
        
        req--- middleware---> Protected routes( By authenticated users only)

















Create Product REST API with below features
1. Product document structure
        a.productId (required)
        b.productName(required)
        c.price(required, min price 10000 and max price 50000)
        d.brand(required)

2. REST API with below operations
        a. Create product
        b. Read all products
        c. Read a product by productId
        d. Update a product by productId
        e. Delete a product by productId




Make the following routes protected
        - Read Users & Products
        - Read User & Product by id
        - Update User & Product
        - Delete User & Product