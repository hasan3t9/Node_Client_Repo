import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../../Hooks/useAxios";
import AuthContext from "../../../../Provider/AuthContext";

const MyPosts = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  // Fetch user's posts
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["myPosts", userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const res = await axiosInstance.get("/posts/user", {
        params: { email: userEmail },
      });
      return res.data;
    },
  });

  // Delete Post Mutation
  const deleteMutation = useMutation({
    mutationFn: (postId) => axiosInstance.delete(`/posts/${postId}`),
    onSuccess: () => {
      toast.success("Post deleted!");
      queryClient.invalidateQueries(["myPosts", userEmail]);
    },
  });

  // Edit Post Mutation
  const editMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      axiosInstance.patch(`/posts/${id}`, updatedData),
    onSuccess: () => {
      toast.success("Post updated!");
      queryClient.invalidateQueries(["myPosts", userEmail]);
    },
  });

  if (isLoading) return <p>Loading your posts...</p>;

  return (
    <div className="p-5 space-y-4">
      <h2 className="text-2xl font-bold">My Posts</h2>
      {posts.length === 0 && <p>You have no posts yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <img
              src={post.contentPhoto}
              alt={post.title}
              className="w-full h-48 object-cover rounded my-2"
            />
            <p className="mb-2">{post.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => deleteMutation.mutate(post._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  const newTitle = prompt("New Title", post.title);
                  const newDesc = prompt("New Description", post.description);
                  const newPhoto = prompt("New Photo URL", post.photo);
                  if (newTitle && newDesc && newPhoto) {
                    editMutation.mutate({
                      id: post._id,
                      updatedData: {
                        title: newTitle,
                        description: newDesc,
                        photo: newPhoto,
                      },
                    });
                  }
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
