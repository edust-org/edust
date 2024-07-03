# Edust | Education Student Teacher

## Overview

Edust is a web application designed to enhance educational collaboration and interaction between students, teachers, and educational institutions. It provides features for user registration, organization page creation, and customization using a page builder tool.

## Features

### User Account and Roles

1. **User Registration:**

   - Users can create an account with basic information (name, email, password, gender).
   - Upon registration, users are assigned the default role of "user."

2. **Content Access:**
   - Registered users can view and interact with public organization pages.
   - Users have the ability to create their own organization pages.

### Organization Page Creation

1. **Organization Types:**

   - Users can create organization pages for different types of institutions (Education, College, School, etc.).

2. **Organization Profile and Landing Page:**

   - Each organization can create a profile and customize a landing page.
   - Utilizes a built-in page builder tool for easy customization of the landing page design.

3. **Public Access:**
   - The created organization landing pages are publicly accessible for viewing by anyone.

## Technologies Used

- **Frontend:** React.js, TypeScript, CSS/SCSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Routing:** React Router
- **Page Builder:** Custom implementation for organization landing pages

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone Repository:**

   ```bash
   git clone https://github.com/your/repository.git
   cd repository
   ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Setup Environment Variables:**
   Create a `.env` file in the root directory and add necessary environment variables.

4. **Run the Application:**

   ```bash
   pnpm start
   ```

5. **Access the Application:**
   Open your web browser and navigate to `http://localhost:5173`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b dev`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin dev`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

This README provides a structured overview of the Edust project, focusing on user registration, organization page creation, and customization features as per your requirements. Adjustments can be made based on further project developments or specific user needs.
