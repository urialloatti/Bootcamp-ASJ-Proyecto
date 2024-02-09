# Final project Bootcamp Fullstack Academ-IT

Project to facilitate the managenment of purchase orders, products and suppliers. The app allows the user to create, update, view and delete every entity.

## Instructions to run the project locally
- Create database.
  `sql
    CREATE DATABASE final_project
  `
- Run Spring project.
  - Update database credentials in application.properties.
      spring.datasource.url = jdbc:sqlserver://localhost;encrypt=false;user=*USERNAME*;password=*PASSWORD*;databaseName=final_project
  - Run Spring project on port 8080

- Run Angular project.
  Run the comand `ng serve` on a terminal inside the suppliers-app folder.

- Open `http://localhost:4200/` in your web explorer. The application will automatically redirect you to the login page.


## Developed by *Alloatti Uriel*
