GitHub OAuth Authentication - Express.js

📌 Overview

This is a simple GitHub OAuth authentication system built with Express.js, passport-github2, and express-session. It allows users to log in using their GitHub account, store session data, and access protected routes.

🚀 Features

OAuth Authentication using GitHub.

Session-based login system (sessions stored in memory for now).

Protected routes requiring authentication.

EJS template engine for rendering views.

📂 Project Structure

/github-oauth-app/
│── views/            # EJS templates for UI
│── public/           # Static assets (CSS, JS, images)
│── .env              # Environment variables (DO NOT SHARE THIS FILE)
│── app.js            # Main Express server file
│── package.json      # Project dependencies
│── package-lock.json # Dependency lock file

⚙️ Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/your-username/github-oauth-app.git
cd github-oauth-app

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add your GitHub OAuth credentials:

GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here

4️⃣ Run the Application

node app.js

or using nodemon (if installed):

npx nodemon app.js

5️⃣ Open in Browser

Visit http://localhost:3000/ to see the application.

🔐 Authentication Flow

User clicks "Login with GitHub" → Redirected to GitHub.

GitHub asks for permission → User grants access.

GitHub redirects back to the app → Authentication is handled.

User session is created → They can access protected routes.

User can log out → Session is destroyed.

🛠️ Tech Stack

Node.js (Backend runtime)

Express.js (Server framework)

Passport.js (Authentication middleware)

express-session (Session management)

passport-github2 (GitHub OAuth strategy)

EJS (Template engine)

🏆 Next Steps

✅ Store sessions in a database (MongoDB, Redis, etc.).

✅ Add a proper UI with Tailwind CSS.

✅ Allow users to store profile info in a database.

📝 Notes

This is a basic OAuth implementation. Do not use in production without improving security!

If GitHub OAuth isn’t working, ensure your .env file is correctly loaded and that the client ID/secret are valid.

Made by justin

