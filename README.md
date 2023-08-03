## Project Overview

The Reddit Clone project is a web application built with Next.js, TypeScript, and Chakra UI. It aims to replicate some of the core features of the popular social media platform Reddit, including communities, posts, voting, and comments.

### Technologies Used

- [Next.js](https://nextjs.org/docs/pages/api-reference/create-next-app) - A React framework for building server-rendered applications.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that enhances code quality and developer productivity.
- [Chakra UI](https://chakra-ui.com/getting-started/nextjs-guide) - A highly customizable UI component library for React and Next.js applications.
- [Firebase](https://firebase.google.com/) - A platform that provides various backend services, including Firestore for the database.
- [Fontsource](https://github.com/fontsource/fontsource) - Provides easy-to-use font packages for web projects.
- [React Icons](https://react-icons.github.io/react-icons/) - A collection of popular icons as React components.
- [Recoil](https://recoiljs.org/docs/basic-tutorial/atoms/) - A state management library for React applications.
- [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks) - React hooks for Firebase services.
- [Moment.js](https://momentjs.com/) - A library for handling dates and times in JavaScript.
- [nookies](https://www.npmjs.com/package/nookies) - A library for managing cookies in Next.js applications.

## Getting Started

Follow these steps to set up the project and run it locally:

1. Clone the repository:

```bash
git clone https://github.com/RuslanTsykaliak/reddit-clone.git
```

2. Navigate to the project folder:

```bash
cd reddit-clone
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your web browser and go to `http://localhost:3000` to see the Reddit Clone application.

## Project Structure

The project is structured in the following way:

- `/pages`: Contains the Next.js page components that define the application routes.
- `/components`: Includes reusable components used throughout the application.
- `/hooks`: Contains custom React hooks used for state management and other functionalities.
- `/atoms`: Contains Recoil atoms, which are used for global state management.
- `/styles`: Contains global styles for the application.
- `/firebase`: Contains the Firebase configuration and initialization.
- `/public`: Holds static files that can be used in the application.

## Contributing

If you want to contribute to this project, feel free to open a pull request. Ensure that all code follows the established coding conventions and is well-documented.

## Known Issues and Improvements

- A missing index in Cloud Firestore affects the `/r/[communityId]` route. The index should be added to resolve this issue.
- A default Posts component is used, but it could be replaced with a custom implementation.
- Some components could be further optimized for performance.

## Contact

If you have any questions or need assistance with the project, feel free to contact me at ruslan.tsykaliak@gmail.com`.
