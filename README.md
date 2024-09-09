## PROJECT TITLE: ImpactGraph


## Current Phase :
```
Complete
```

 

## :gear: :wrench: TECHNOLOGIES AND PLATFORMS :
* :white_circle:  Platform   - Website Application
* :white_circle:  Database   - ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
* :white_circle:  FrontEnd - ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* :white_circle:  FrontEnd (CSS) - ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
* :white_circle:  BackEnd  - ![Node.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
* :white_circle:  Version Control - ![Github](https://img.shields.io/badge/GitHub-108000?style=for-the-badge&logo=github&logoColor=white)




##  :briefcase: Brief Overview : 
```
In a complex network environment, engineers often need to take down specific
components for maintenance, updates, or troubleshooting.
Currently, the process of identifying and understanding the downstream impact of
shutting down a component relies heavily on the engineer's memory and manual
tracking.
This method is prone to errors, as engineers may overlook certain dependencies or miss
components that are indirectly affected.An Interactive Component Dependency Management System.
This application will provide a visual representation of all components and their dependencies
within the network.It will support operations for managing components and their
dependencies
 ```


![image](https://github.com/lomatul/InternConnect/assets/90206489/4ae0036d-7d02-46fc-8a87-f790129dde7e)


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
     * The "Company Pool" section displays company details.
 ```
```
 5. INTERACTIVE GRAPH
     * User and Admins can view a interactive network graph will all components
 ```

 ```
6. COMPONENT SEARCH & VIEW:
     * Users and Admins are able to search any components by its name or ip address and can view the details
 ```

![image](https://github.com/lomatul/InternConnect/assets/90206489/fec5ef39-010a-49f8-a38f-55afd87da50c)




## :hammer_and_wrench: Setup :
## For UI / Frontend

### Step 1: Clone project

Clone the UI Project from Here [ImpactGraph-UI](https://github.com/Habib0905/ImpactGraph-UI.git).


### Step 2: Open it in VSCode / any other Editor


### Step 3: Install npm and other dependencies

```sh
npm install
```

### :globe_with_meridians: Step 4: Run ImpactGraph-UI in your local 

```sh
npm run start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```sh
npm test
```
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```sh
npm run build
```
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## For Backend/ MW

### Step 1: Clone project

Clone the Backend Project from Here [ImpactGraph-MW](https://github.com/Habib0905/ImpactGraph-UI.git).


### Step 2: Open it in Intelij / any other Editor

### Step 3: Install Dependencies
#### Java Version - JDK 21 
#### SDK
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
#### Applicarion.yml
```sh
spring.application.name=ImpactGraph
server.port = 8081
spring.neo4j.uri=< your neo4j/ auradb uri >
spring.neo4j.authentication.username= < your Neo4j Username >
spring.neo4j.authentication.password=< your Neo4j Password >
spring.app.jwtSecret=4b3e5zF8xJZpWkNwQzCFJaNdRgUkXp2s5v8yBEHMbQeThWmZq4t6w9
spring.app.jwtExpirationMs=86400000
spring.security.user.password=admin
spring.security.user.name=admin


spring.datasource.url= < your Mysql Url >
spring.datasource.username= < your mysql Username >
spring.datasource.password=< your mysql Password >
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver


spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### :globe_with_meridians: Step 4: Run ImpactGraph-MW in your local 
#### You can build the project and run the tests by running mvn clean package
#### There are several ways to run a Spring Boot application on your local machine. One way is to execute the main method in the com.project.ImpactGraph class from your IDE.


## Group Members :
 #### Lomatul Mahzabin 
 #### Habib Hussain 


