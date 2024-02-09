# Final project Bootcamp Fullstack Academ-IT

Project to facilitate the managenment of purchase orders, products and suppliers. The app allows the user to create, update, view and delete every entity.

## Instructions to run the project locally
- Create database.
  `sql
    CREATE DATABASE final_project
  `

  *The database will be automatically filled with the necessary data to be properly tested. Once the developing stage is over, the fake data will be removed.*
- Run Spring project.
  - Run the command `mvn install` on a terminal inside the BackEnd/finalProject folder 
  - Update database credentials in application.properties.

    spring.datasource.url = jdbc:sqlserver://localhost;encrypt=false;user=*USERNAME*;password=*PASSWORD*;databaseName=final_project
  - Run Spring project on port 8080

- Run Angular project.
  - Run the command `npm install` on a terminal inside the suppliers-app folder or install the maven dependencies in the Java IDE.
  - Run the command `ng serve` on a terminal inside the suppliers-app folder.

- Open `http://localhost:4200/` in your web explorer. The application will automatically redirect you to the login page.

In the begining, there will be two users loaded, 'ualloatti' with password 'useradmin' that has admin permits and 'aacosta' with password '12345' without admin permits.

## Project references
### Spring API references
- Suppliers:
  - Get methods
    - Get all availables suppliers `http GET http://localhost:8080/app/suppliers`
    - Get all deleted suppliers `http GET http://localhost:8080/app/suppliers/deleted`
    - Get supplier by Id `http GET http://localhost:8080/app/suppliers/{id}`
    - Get supplier by Id for update `http GET http://localhost:8080/app/suppliers/u/{id}`
    - Get suppliers count `http GET http://localhost:8080/app/suppliers/count`
  - Post methods
    - Post new supplier `http POST http://localhost:8080/app/suppliers`
  - Put methods
    - Update supplier `http PUT http://localhost:8080/app/suppliers/{id}`
  - Patch methods
    - Change supplier availability `http PATCH http://localhost:8080/app/suppliers/delete/{id}`
    - Check if supplier cuit exists `http PATCH http://localhost:8080/app/suppliers/check-cuit`
- Products:
  - Get methods
    - Get all availables products `http GET http://localhost:8080/app/products`
    - Get all deleted products `http GET http://localhost:8080/app/products/deleted`
    - Get all availables products by supplier id `http GET http://localhost:8080/app/products/supplier/{id}`
    - Get products by Id `http GET http://localhost:8080/app/products/{id}`
    - Get products by Id for update `http GET http://localhost:8080/app/products/u/{id}`
    - Get products count `http GET http://localhost:8080/app/products/count`
  - Post methods
    - Post new products `http POST http://localhost:8080/app/products`
  - Put methods
    - Update products `http PUT http://localhost:8080/app/products/{id}`
  - Patch methods
    - Change products availability `http PATCH http://localhost:8080/app/products/delete/{id}`
- Purchase Orders:
  - Get methods
    - Get all purchase orders `http GET http://localhost:8080/app/purchase-orders`
    - Get purchase orders by Id `http GET http://localhost:8080/app/purchase-orders/{id}`
    - Get purchase orders by Id for update `http GET http://localhost:8080/app/purchase-orders/u/{id}`
    - Get purchase orders count `http GET http://localhost:8080/app/purchase-orders/count`
  - Post methods
    - Post new purchase orders `http POST http://localhost:8080/app/purchase-orders`
  - Put methods
    - Update purchase orders `http PUT http://localhost:8080/app/purchase-orders/{id}`
  - Patch methods
    - Change purchase orders availability `http PATCH http://localhost:8080/app/purchase-orders/delete/{id}`
- Sectors:
  - Get methods
    - Get all availables sectors `http GET http://localhost:8080/app/sectors`
    - Get sectors by Id `http GET http://localhost:8080/app/sectors/{id}`
  - Post methods
    - Post new sectors `http POST http://localhost:8080/app/sectors`
  - Put methods
    - Update sectors `http PUT http://localhost:8080/app/sectors/{id}`
  - Patch methods
    - Change sectors availability `http PATCH http://localhost:8080/app/sectors/delete/{id}`
    - Check if sector with a given name already exists `http PATCH http://localhost:8080/app/sectors/exitst-by-name`
- Categories:
  - Get methods
    - Get all availables categories `http GET http://localhost:8080/app/categories`
    - Get categories by Id `http GET http://localhost:8080/app/categories/{id}`
  - Post methods
    - Post new categories `http POST http://localhost:8080/app/categories`
  - Put methods
    - Update categories `http PUT http://localhost:8080/app/categories/{id}`
  - Patch methods
    - Change categories availability `http PATCH http://localhost:8080/app/categories/delete/{id}`
    - Check if categories with a given name already exists `http PATCH http://localhost:8080/app/categories/exitst-by-name`
- Users:
  - Post methods
    - Login and get user information `http POST http://localhost:8080/app/users/login`
    - Check if credentials stored are valid `http POST http://localhost:8080/app/users/check-credentials`
    - Create a new user `http POST http://localhost:8080/app/users/signup`
  - Patch methods
    - Check if an username with a given name already exists `http POST http://localhost:8080/app/users/check-username`
- Locations:
  - Get methods
    - Get all availables locations `http GET http://localhost:8080/app/locations`
    - Get all availables locations by a county id `http GET http://localhost:8080/app/locations/country-id/{id}`
- Fiscal conditions:
  - Get methods
    - Get fiscal conditions `http GET http://localhost:8080/app/fiscal-conditions`

## Developed by *Alloatti Uriel*
