import { useEffect, useState } from "react";
import christmasTreeImage from "../assets/christmas-tree.png";
import gift2Image from "../assets/gift-2.png";
import giftImage from "../assets/gift.png";
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
      <h1 className="lg:text-8xl md:text-6xl sm:text-4xl font-festive text-white">
        Happy Christmas Thoughts
      </h1>
      <div className="flex justify-center items-center py-8">
        <img
          src={christmasTreeImage}
          alt=""
          width={32}
          height={32}
          className="lg:w-48 md:w-32 sm:w-24"
        />
        <div className="grid">
          <div className="relative">
            <textarea
              rows="4"
              cols="50"
              placeholder="Share your positive Christmas message here..."
              value={newThoughts}
              onChange={handleNewThoughtChange}
              className="max-h-[10rem] w-full bg-green-200 border-white border-4 shadow-inner shadow-black p-4 text-white"
              style={{ color: isTextTooLong ? "red" : "black" }}
            ></textarea>
            <div className="absolute bottom-6 right-4">
              <span className={`text-${isTextTooLong ? "red" : "green"}-600`}>
                {newThoughts.length <= 140
                  ? `${140 - newThoughts.length} words remaining`
                  : `-${newThoughts.length - 140} words exceeding`}
              </span>
            </div>
          </div>
          <button
            onClick={handlePostThoughts}
            disabled={isTextTooLong}
            style={isTextTooLong ? { backgroundColor: "grey", cursor: "not-allowed" } : {}}
            className="w-24 p-2 border-white border-2 bg-pink-400 m-auto rounded-full text-white"
          >
            Post
          </button>
        </div>
        <img src={gift2Image} alt="" width={32} height={32} className="lg:w-48 md:w-32 sm:w-24" />
        <br />
      </div>
      <div className="flex justify-center items-center w-[80%]">
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-12 md:gap-4">
          {thoughts.map((thought) => (
            <li
              key={thought._id}
              className="h-full border-white border-4 shadow-inner shadow-black bg-yellow-200 rounded-xl p-6 break-words"
            >
              <span className="block min-h-[6rem] text-lg md:text-base sm:text-sm  text-gray-800">
                {thought.message}
              </span>
              <div className="flex justify-end items-center">
                <span className="px-2 text-red-600">{thought.hearts}</span>
                <button onClick={() => handleLikeThoughts(thought._id)}>
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
