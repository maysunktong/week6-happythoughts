import { useEffect, useState } from "react";
import api from "../utils/api";

export const PostBoard = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThoughts, setNewThoughts] = useState("");
  const [isTextTooLong, setIsTextTooLong] = useState(false);

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

  const handlePostThoughts = async () => {
    if (!isTextTooLong) {
      try {
        await api.postThought(newThoughts);
        handleFetchThoughts();
        setNewThoughts("");
        setIsTextTooLong(false);
      } catch (error) {
        console.error("Error posting thought:", error);
      }
    } else {
      console.error("Text is too long. Cannot post thought.");
    }
  };

  const handleLikeThoughts = async (thoughtId) => {
    try {
      await api.likeThought(thoughtId);
      // If the like is successful, fetch the latest thoughts
      handleFetchThoughts();
    } catch (error) {
      console.error("Error liking thought:", error);
    }
  };

  const handleNewThoughtChange = (event) => {
    const newText = event.target.value;
    setNewThoughts(newText);
    setIsTextTooLong(newText.length > 140);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl lg:text-5xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
      Project Happy Thoughts
      </h1>
      <div className="flex justify-center items-center py-8">
        
        <div className="grid">
          <div className="relative border border-black py-6 px-8 bg-gray-200">
            <p className='text-2xl lg:text-3xl font-bold py-4'>What is making you happy right now?</p>
            <textarea
              rows="4"
              cols="50"
              placeholder="Share your positive message here..."
              value={newThoughts}
              onChange={handleNewThoughtChange}
              className="max-h-[10rem] w-full border border-black shadow-inner  p-4 "
              style={{ color: isTextTooLong ? "red" : "black" }}
            ></textarea>
            <div className="absolute bottom-6 right-4">
              <span className={`text-${isTextTooLong ? "red" : "green"}-600`}>
                {newThoughts.length <= 140
                  ? `${140 - newThoughts.length} words remaining`
                  : `-${newThoughts.length - 140} words exceeding`}
              </span>
            </div>
            <button
            onClick={handlePostThoughts}
            disabled={isTextTooLong}
            style={isTextTooLong ? { backgroundColor: "grey", cursor: "not-allowed" } : {}}
            className="border rounded-3xl w-fit p-2 bg-red-300 mt-8"
          >
            ❤️Send Happy Thoughts❤️
          </button>
          </div>
          
        </div>
       
      </div>
      <div className="flex justify-center items-center w-full">
        <ul className="w-[50%] flex flex-col gap-4">
          {thoughts.map((thought) => (
            <li
              key={thought._id}
              className="w-full h-full border border-black break-words p-6"
            >
              <span className="min-h-[3rem] text-md lg:text-lg  text-gray-800 font-medium">
                {thought.message}
              </span>
              <div className="flex justify-between items-center">
               
                <div>
                  <button onClick={() => handleLikeThoughts(thought._id)} className='rounded-full border py-2 px-4 bg-slate-400'>
                    ❤️
                  </button>
                  <span className="px-2">x {thought.hearts}</span>
                </div>
                <div className="text-sm text-gray-500">
                {Math.floor((new Date() - new Date(thought.createdAt)) / (1000 * 60 * 60 * 24))} days ago
              </div>
              </div>
      
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
