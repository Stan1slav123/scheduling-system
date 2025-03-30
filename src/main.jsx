// Import the createRoot function from the React DOM client
import { createRoot } from 'react-dom/client'

// Import the main App component
import { App } from './App'

// Get the HTML element with the id 'root' from index.html
const element = document.getElementById('root');

// Create a React root and render the App component inside the 'root' div
createRoot(element).render(
  <App/>
)