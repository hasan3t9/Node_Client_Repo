import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../../Provider/AuthContext";
import axiosInstance from "../../../../Hooks/useAxios";

const AddPost = () => {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const name = userData?.name;
  const email = userData?.email;
  const authorPhoto = userData?.photo;

  console.log(authorPhoto);

  useEffect(() => {
    if (!user?.email) return;

    axiosInstance
      .get("/users", { params: { email: user.email } })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const contentPhoto = form.contentPhoto.value;

    const newPost = {
      title,
      description,
      contentPhoto,
      name,
      email,
      authorPhoto,
    };

    try {
      const res = await axiosInstance.post("/posts", newPost);
      if (res.data.insertedId) {
        toast.success("Post submitted for approval!");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit post.");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Post</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            name="title"
            type="text"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Write your post..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Photo URL</label>
          <input
            name="contentPhoto"
            type="text"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
