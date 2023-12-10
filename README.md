CSS framework - Tailwind CSS

## Problem
The Happy Thoughts board is built in order to practice state management in React. The board is a list of positive messages that users can share with each other. The messages are stored in an API and fetched from there.

## State initialization
const [thoughts, setThoughts] = useState([]);: Initializes state for storing the array of thoughts retrieved from the API.
const [newThoughts, setNewThoughts] = useState("");: Initializes state for the text input where users can share their positive Christmas messages.
const [isTextTooLong, setIsTextTooLong] = useState(false);: Initializes state to track whether the input text exceeds the limit of 140 characters.

### Fetching part
useEffect(() => { handleFetchThoughts(); }, []);: Uses the useEffect hook to fetch thoughts from the API when the component mounts.

### Handling input changes
const handleNewThoughtChange = (event) => { ... }: Updates the newThoughts state based on user input and checks if the input text exceeds 140 characters, updating the isTextTooLong state accordingly.

## UI
Responsive layout with Tailwind CSS classes (lg:, md:, sm:, etc.) for different screen sizes.

## Deployed version
