import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import axiosInstance from "../../../../Hooks/useAxios";

const PendingPost = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    axiosInstance.get("/posts?status=pending").then((res) => {
      setPosts(res.data);
    });
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await axiosInstance.patch(`/posts/${id}`, {
        status: "approved",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Post approved!");
        setPosts(posts.filter((post) => post._id !== id));
      }
    } catch (err) {
      toast.error("Failed to approve post.", err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosInstance.patch(`/posts/${id}`, {
        status: "rejected",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Post rejected!");
        setPosts(posts.filter((post) => post._id !== id));
      }
    } catch (err) {
      toast.error("Failed to reject post.", err);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Pending Posts</h2>
      {posts.length === 0 && <p>No pending posts.</p>}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded mb-4 shadow-sm">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <img
              src={post.contentPhoto}
              alt="Post"
              className="h-64 w-64 object-cover rounded my-2"
            />
            <p>{post.description}</p>
            <p className="text-sm text-gray-500 mt-1">Author: {post.name}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleApprove(post._id)}
                className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(post._id)}
                className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingPost;
