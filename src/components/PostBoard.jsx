import { useEffect, useState } from 'react';
import api from '../utils/api';

export const PostBoard = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThoughts, setNewThoughts] = useState('');
  
  useEffect(() => {
    handleFetchThoughts();
  }, []);

  const handleFetchThoughts = async() => {
    try {
      const data = await api.fetchThoughts();
      setThoughts(data);
    } catch (error) {
      console.error('Error fetching thoughts:', error);
    }
  }

  const handlePostThought = async () => {
    try {
      await api.postThought(newThoughts);
      handleFetchThoughts();
      // Clear the input field
      setNewThoughts('');
    } catch (error) {
      console.error('Error posting thought:', error);
    }
  };

  const handleLikeThought = async (thoughtId) => {
    try {
      await api.likeThought(thoughtId);
      // If the like is successful, fetch the latest thoughts
      handleFetchThoughts();
    } catch (error) {
      console.error('Error liking thought:', error);
    }
  };

  const handleNewThoughtChange = (event) => {
    setNewThoughts(event.target.value);
  };


  return (
    <div>
      <h1>Post Board</h1>
      <div>
        <textarea
          rows="4"
          cols="50"
          placeholder="Share your thoughts..."
          value={newThoughts}
          onChange={handleNewThoughtChange}
        ></textarea>
        <br />
        <button onClick={handlePostThought}>Post Thought</button>
      </div>
      <div>
        <h2>Latest Thoughts</h2>
        <ul className='flex w-8'>
          {thoughts.map((thought) => (
            <li key={thought._id} className='w-fit'>
              {thought.message} - Likes: {thought.hearts}
              <button onClick={() => handleLikeThought(thought._id)}>Like</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
