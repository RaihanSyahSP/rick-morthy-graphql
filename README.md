# Rick and Morty GraphQL App
## Overview
This application is a web-based interface for exploring episodes and characters from the *Rick and Morty* series using GraphQL. The app provides functionality for searching episodes, viewing detailed character information, and includes infinite scrolling for seamless data loading.
## Features
- **Search Episodes**: Filter episodes by name and display the results.
- **Infinite Scrolling**: Automatically load more episodes as you scroll down the list.
- **Character Details**: Clickable character names that display detailed information.
- **Responsive Design**: Designed to work across various screen sizes.
## Technologies Used
- **React**: Frontend library for building the user interface.
- **TypeScript**: Provides type safety and development efficiency.
- **GraphQL**: Query language for fetching data from the backend.
- **Apollo Client**: Manages data and interacts with GraphQL.
- **Vite**: Build tool for fast development and build processes.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Jest**: For Testing.
## Getting Started
### Prerequisites
- **Node.js** (v18 or later)
- **Docker** (for containerized environment)
### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/rick-morty-graphql-app.git
   cd rick-morty-graphql-app

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```


The app will be available at http://localhost:3000.
Running with Docker
1. **Build the Docker image:**
   ```bash
   docker build -t rick-morty-graphql
   ```

2. **Run the Docker container:**
   ```bash
   docker run -p 3000:3000 rick-morty-graphql
   ```

Access the app at http://localhost:3000.
Usage
* **Search Episodes**: Use the search fields to filter episodes by name and episode number.
* **View Characters**: Click on character names within an episode to see detailed information.
* **Scroll for More**: As you scroll down, more episodes will be loaded automatically.
Configuration
GraphQL Queries
* **GET_EPISODES**: Fetches a list of episodes with filtering options.
* **GET_CHARACTERS**: Fetches a list of all characters.
* **GET_CHARACTER_BY_ID**: Fetches detailed information about a character by ID.
UI Components
* **Grid**: Displays the list of episodes with search and filtering functionality.
* **CardEpisode**: Represents an individual episode in the list.
* **CharacterSelected**: Shows details of the selected character.
* **ErrorMessage**: Displays error messages.
* **Loading**: Shows a loading indicator.
Testing
Run tests using Jest:

```bash
npm run test
```


Contributing
Feel free to open issues or submit pull requests if you have suggestions or improvements.
