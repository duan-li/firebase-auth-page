# firebase-auth-page

# Firebase Authentication and User Profile Management

This project is a React application that demonstrates Firebase authentication with multiple sign-in methods and user profile management. It includes a login page with various authentication options and a profile page where users can view and edit their information.

## Features

- User authentication with email/password
- Social login options (Google, Facebook, Twitter, GitHub)
- User profile management (update display name, email, profile picture)
- Password change functionality
- Protected routes for authenticated users

## Technologies Used

- React
- TypeScript
- Firebase (Authentication and Firestore)
- React Router
- Tailwind CSS
- Lucide React (for icons)

## Project Structure

- `src/App.tsx`: Main application component with routing
- `src/firebase.ts`: Firebase configuration and initialization
- `src/components/Login.tsx`: Login page component
- `src/components/Profile.tsx`: User profile page component
- `src/components/PrivateRoute.tsx`: Protected route component

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a Firebase project and obtain the configuration
4. Update the Firebase configuration in `src/firebase.ts`:
   ```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```
5. Enable the authentication methods you want to use in the Firebase console
6. Run the development server:
   ```
   npm run dev
   ```

## Usage

1. Open the application in your browser
2. On the login page, choose your preferred sign-in method:
   - Enter email and password for email/password authentication
   - Click on a social login button for third-party authentication
3. After successful login, you'll be redirected to the profile page
4. On the profile page, you can:
   - View and edit your display name, email, and profile picture URL
   - Change your password
   - Log out

## Note

Make sure to handle security rules in Firebase to protect user data and ensure that only authenticated users can access and modify their own data.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).