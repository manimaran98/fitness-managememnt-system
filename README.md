# Fitness Management System

## Overview

The Fitness Management System is a web application designed to help fitness centers efficiently manage their operations. It provides essential features for user registration, member management, and administrative control, making it easier for fitness centers to track memberships and related activities.

## Features

- **Authentication Module**: Secure login and registration for users.
- **Dashboard**: A centralized panel for managing members and fitness-related data.
- **Member Management**: Full CRUD (Create, Read, Update, Delete) functionality for managing members.
- **Admin Role**: Admin users can add, update, and delete member records.

## Technologies Used

- **Frontend**: Angular
- **Backend**: Java Spring Boot
- **Database**: MySQL
- **Authentication**: JWT-based authentication for security

## Installation

### Prerequisites
- Node.js & npm installed
- Java Development Kit (JDK) installed
- MySQL installed

### Steps to Run the Application

#### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/manimaran98/fitness-managememnt-system.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd fitness-management-backend
   ```
3. Configure the database connection in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/fitnessapplicationdb
   spring.datasource.username=root
   spring.datasource.password=password
   ```
4. Build and run the backend:
   ```bash
   mvn spring-boot:run
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../fitness-management-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular application:
   ```bash
   ng serve
   ```
4. Open your browser and go to `http://localhost:4200`.

## Usage

- **Login/Register**: Users can create an account and log in.
- **Dashboard**: Admin users can manage members via the dashboard.
- **CRUD Operations**: Add, view, update, and delete members.

## Contributing

We welcome contributions! If you want to contribute:
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Thanks to all contributors and the open-source community for their support!

