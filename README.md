# Ecommerce Application using Microservices Architecture, Event Sourcing, CQRS, and Saga Pattern

This is my graduation project, forwarded from my private repository for submission.  
Special thanks to **PTIT** for 4.5 wonderful years filled with love and beautiful memories. ❤️  

---

## **Project Overview**

This project demonstrates the practical implementation of modern microservices architecture, focusing on the following key concepts:  

- **Event Sourcing**: Captures all changes to application state as a sequence of events.  
- **CQRS (Command Query Responsibility Segregation)**: Separates read and write operations for better scalability and performance.  
- **Saga Pattern**: Manages distributed transactions across multiple services to ensure data consistency in a loosely coupled environment.  

---

## **System Overview**

![System Overview](https://github.com/user-attachments/assets/990e508d-b3cc-4c2e-afa6-6b6718d8c188)

---

## **Key Features**

### **1. Product Service**
- Implements **CQRS** and **Event Sourcing**.  
- Handles commands like creating, updating, or deleting products and maintains a consistent event log.  
- Query side is optimized using **MongoDB** for fast and flexible data retrieval.  

![Product Service](https://github.com/user-attachments/assets/4134f701-f1f8-40db-b454-e9b26378a3be)

---

### **2. Order Service**
- Implements **CQRS** and **Event Sourcing**.  
- Manages customer orders, applying **Saga Orchestration** to handle complex workflows.  
- Ensures eventual consistency with services like **Inventory Service** and **Payment Service**.  

---

### **3. Inventory Service**
- Manages product stock levels, ensuring inventory consistency across the system.  
- Updates stock levels when an order is placed or canceled.  
- Publishes events to notify other services about stock availability.  
- Prevents orders from being processed if stock is insufficient.  

---

### **4. Payment Service**
- Handles all payment-related processes, ensuring secure and reliable transactions.  
- Ensures payment status updates are consistent across the system.  

---

### **5. User Service**
- Provides user authentication and profile management.  
- Uses traditional **CRUD operations** for simplicity.  

---

### **6. Shipment Service**
- Manages the delivery of orders.  
- Ensures shipments are tracked from confirmation to completion.  

---

### **7. API Gateway**
- Serves as the entry point, routing requests to the appropriate microservices.  

---

## **Sequence Diagram for Order Feature**

![Sequence Diagram](https://github.com/user-attachments/assets/2fdda05f-7b29-47d3-b26d-9c617afdabef)

---

## **Semantic Lock in Order Service**

The **Semantic Lock** mechanism prevents race conditions and ensures data consistency when processing orders in a distributed environment.  
This is critical in scenarios with concurrent operations, such as modifying inventory stock or payment status.  

---

## **System Architecture**

The application consists of multiple microservices communicating via an **event-driven architecture**.  

- **Frontend**: ReactJS.  
- **Backend Services**: Spring Boot microservices with separate databases for CQRS.  
- **Event Bus**: Kafka for publishing and consuming events.  
- **Database**:  
  - **SQL (MySQL)** for write operations and event store.  
  - **NoSQL (MongoDB)** for optimized read operations.  

---

## **Technologies Used**

- **Frontend**: ReactJS, Redux, Axios, Tailwind CSS.  
- **Backend**: Spring Boot, Spring Cloud, Spring Security, Spring Data JPA.  
- **Database**: MySQL, MongoDB.  
- **Event Streaming**: Apache Kafka.  
- **Deployment**: Docker, Docker Compose.  

---

## **Installation & Setup**

1. **Clone the Repository**  

   ```bash
   git clone https://github.com/your-username/ecommerce-microservices.git
   cd ecommerce-microservices

2. **Start DB Setup using Docker Compose**  

   ```bash
   docker-compose up --build -d


3. **Start All Services in Your IDE**  

4. **Start the Frontend**

   ```bash
   cd frontend
   npm install
   npm start

5. **Login with Admin**

   ```bash
   username: admin
   password: admin

6. **Go to the dashboards, create categoires and products**
