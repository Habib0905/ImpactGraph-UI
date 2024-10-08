## PROJECT TITLE: ImpactGraph


## Current Phase :
```
Complete
```

 

## :gear: :wrench: TECHNOLOGIES AND PLATFORMS :
* :white_circle:  Platform   - Website Application
* :white_circle:  User Database   - ![MySql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
* :white_circle:  Graph Database   - ![Neo4j](https://img.shields.io/badge/Neo4j-018bff?style=for-the-badge&logo=neo4j&logoColor=white)
* :white_circle:  FrontEnd - ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* :white_circle:  FrontEnd (CSS) - ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
* :white_circle:  BackEnd  - ![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
* :white_circle:  Version Control - ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)




##  :briefcase: Brief Overview : 
```
In a complex network environment, engineers often need to take down specific components for
maintenance, updates, or troubleshooting. Currently, the process of identifying and understanding
the downstream impact ofshutting down a component relies heavily on the engineer's memory
and manual tracking.
This method is prone to errors, as engineers may overlook certain dependencies or miss
components that are indirectly affected.An Interactive Component Dependency Management System.
This application will provide a visual representation of all components and their dependencies
within the network.It will support operations for managing components and their dependencies
 ```


![image](https://github.com/user-attachments/assets/9f3edbd0-4ec8-45fd-98a0-47a18f4a6d1b)


 ##  :high_brightness:  System Features : 
 ```
 1. COMPONENT CREATE
     * Admin can create any Component to the system.
 
 ```
 
 ```
 2. COMPONENT UPDATE
     * Allows admins to update the component's details.
 ```
 
 
 ```
 3. COMPONENT DELETE
     * Admins can delete any single component.
 ```
 
 
 ```
 4. DEPENDENCY MANGEMENT
     * Admin can manage the dependencies of the components
 ```
```
 5. INTERACTIVE GRAPH
     * User and Admins can view a interactive network graph consisting all the components
 ```

 ```
6. COMPONENT SEARCH & VIEW:
     * Users and Admins are able to search any components by its name or ip address and can view the details
 ```

![image](https://github.com/user-attachments/assets/f8d4efb3-7c7f-4cfd-b56c-ca39101743e4)




## :hammer_and_wrench: Setup :
## For UI / Frontend

### Step 1: Clone project

Clone the UI Project from Here [ImpactGraph-UI](https://github.com/Habib0905/ImpactGraph-UI.git).


### Step 2: Open it in VSCode / any other Editor


### Step 3: Install npm and other dependencies
Node.js Version- 20.15.0
```sh
npm install
```
### Step 4: Create .env file
```sh
PORT = <Port Number>
REACT_APP_SECRET_KEY = <Secret Key>
REACT_APP_BASE_URL = <Base Url>
```

### :globe_with_meridians: Step 5: Run ImpactGraph-UI in your local 

```sh
npm run start
```
You can run the project by Process Manager. There is a file in the Project directory named "ecosystem.config.js". In this file you can add your own script , Project Name ,
can define the maximum number of CPU and Memory usage.
```sh
npm install pm2@latest -g
npm run build
```

```sh
pm2 start ecosystem.config.js
```


Runs the app in the development mode.\
Open [http://localhost:<Port_Number>](http://localhost:Port_Number) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## For Backend/ MW

### Step 1: Clone project

Clone the Backend Project from Here [ImpactGraph-MW](https://github.com/lomatul/ImpactGraph-MW.git).


### Step 2: Open it in Intelij / any other Editor

### Step 3: Install Dependencies
#### Java Version - JDK 21 
#### SDK - default
```sh
	implementation 'org.springframework.boot:spring-boot-starter-data-neo4j'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	runtimeOnly 'com.mysql:mysql-connector-j'
	implementation 'org.springframework.boot:spring-boot-starter-security'
	testImplementation 'org.springframework.security:spring-security-test'
	implementation 'io.jsonwebtoken:jjwt-api:0.12.6'
	runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.6'
	runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.6'
```
#### Plugins
```sh
	id 'java'
	id 'org.springframework.boot' version '3.3.1'
	id 'io.spring.dependency-management' version '1.1.5'
```
#### application.properties
```sh
spring.application.name=ImpactGraph
server.port = 8081
app.allowed.origins=<URL>
spring.neo4j.uri= <your neo4j/ auradb uri>
spring.neo4j.authentication.username= <your Neo4j Username>
spring.neo4j.authentication.password= <your Neo4j Password>
spring.app.jwtSecret=4b3e5zF8xJZpWkNwQzCFJaNdRgUkXp2s5v8yBEHMbQeThWmZq4t6w9
spring.app.jwtExpirationMs=604800000
spring.security.user.password=admin
spring.security.user.name=admin


spring.datasource.url= <your Mysql Url>
spring.datasource.username= <your mysql Username>
spring.datasource.password= <your mysql Password>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver


spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect


logging.level.root=INFO
logging.level.org.neo4j=INFO
logging.level.org.springframework.data.neo4j=INFO
logging.level.org.springframework.data.neo4j.cypher=ERROR
logging.file.path = <log file path>
```


### :globe_with_meridians: Step 4: Run ImpactGraph-MW in your local machine
You can build the project and run the tests.

#### There are several ways to run a Spring Boot application on your local machine:
One way is to execute the main method in the `com.project.ImpactGraph` class from your IDE.

---

#### Running a JAR with an external `application.properties` file:

1. **Create the JAR file:**
   - In **IntelliJ**, go to the **Gradle** tab and run `bootJar`. 
   - This will create a JAR file in the `build/libs` directory.

2. **Run the JAR with an external `application.properties` file:**
   
  Run the following command in the terminal to run the JAR:

   ```sh
   java -jar ImpactGraph.jar --spring.config.location=classpath:/,file:/path/to/external/application.properties
   ```

**Replace** the `/path/to/external/application.properties` with the actual path to your `application.properties file`.

![image](https://github.com/user-attachments/assets/601661bf-5731-4632-b643-23c227b5dea5)

## Collaborators :
 #### [Lomatul Mahzabin](https://github.com/lomatul).
 #### [Habib Hussain](https://github.com/Habib0905).


