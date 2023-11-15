import { useEffect, useState } from "react";
import api from "../utils/api";
import giftImage from "../assets/gift.png";
import gift2Image from "../assets/gift-2.png";
import hatImage from "../assets/hat.png";
import christmasTreeImage from "../assets/christmas-tree.png";

export const PostBoard = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThoughts, setNewThoughts] = useState("");

  useEffect(() => {
    handleFetchThoughts();
  }, []);

  const handleFetchThoughts = async () => {
    try {
      const data = await api.fetchThoughts();
      setThoughts(data);
    } catch (error) {
      console.error("Error fetching thoughts:", error);
    }
  };

  const handlePostThought = async () => {
    try {
      await api.postThought(newThoughts);
      handleFetchThoughts();
      // Clear the input field
      setNewThoughts("");
    } catch (error) {
      console.error("Error posting thought:", error);
    }
  };

  const handleLikeThought = async (thoughtId) => {
    try {
      await api.likeThought(thoughtId);
      // If the like is successful, fetch the latest thoughts
      handleFetchThoughts();
    } catch (error) {
      console.error("Error liking thought:", error);
    }
  };

  const handleNewThoughtChange = (event) => {
    setNewThoughts(event.target.value);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1>Happy Christmas Thoughts</h1>
      <div className='flex justify-center items-center'>
        <img src={christmasTreeImage} alt="" width={32} height={32} className='w-48' />
        <div className='grid'> 
          <textarea
            rows="4"
            cols="50"
            placeholder="Share your positive Christmas message here..."
            value={newThoughts}
            onChange={handleNewThoughtChange}
            className='bg-green-800 border-white border-4 shadow-inner shadow-black p-4 text-white'
          ></textarea>
          <button onClick={handlePostThought}>Post Thought</button>
        </div>
        <img src={gift2Image} alt="" width={32} height={32} className='w-48' />
        <br />
        
      </div>
      <div className="flex justify-center items-center w-[80%]">
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-12">
          {thoughts.map((thought) => (
            <li
              key={thought._id}
              className="border-white border-4 shadow-inner shadow-black bg-yellow-200 rounded-xl p-6 break-words"
            >
              <span className="block h-[8rem] text-lg md:text-base sm:text-sm  text-gray-800">
                {thought.message}
              </span>
              <div className="flex justify-end items-center">
                <span className="px-2 text-red-600">{thought.hearts}</span>
                <button onClick={() => handleLikeThought(thought._id)}>
                  <img src={giftImage} alt="" width={32} height={32} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
