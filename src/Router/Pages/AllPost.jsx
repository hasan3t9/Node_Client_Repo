import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hooks/useAxios";
import { MdEdit } from "react-icons/md";


const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    axiosInstance.get("/posts?status=approved").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {posts.map((post) => (
        <div key={post._id} className="p-4 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center pb-5 gap-4">
              <div className="avatar">
                <div className="ring-primary w-9 h-9  ring-offset-base-100  rounded-full ring-2 ring-offset-2">
                  <img src={post?.authorPhoto} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-500 mt-1">
                {post.name}
              </p>
            </div>
            <button className="btn">
              <MdEdit />
            </button>
          </div>
          <h3 className="text-lg font-bold mb-1">{post.title}</h3>
          <p>{post.description}</p>
          <img
            src={post.contentPhoto}
            className="w-full h-auto rounded-2xl pt-5 object-cover  mb-2"
          />
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
