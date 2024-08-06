"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";
import "./loader.css";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  startDate?: string; // or Firebase Timestamp
  endDate?: string; // or Firebase Timestamp
}

const ViewPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postList);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error deleting post: ", err);
    }
  };

  const handleEdit = (id: string) => {
    // Redirect to the edit page or open a modal for editing
    // You can use a router push or set a state to open a modal
    // For example: router.push(`/edit-post/${id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
        <p className="py-20 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Content
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Image
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Start Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            End Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {posts.map((post) => (
          <tr key={post.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {post.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {post.content}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-20 w-20 object-cover"
                />
              ) : (
                "No Image"
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {post.startDate ? new Date(post.startDate).toLocaleDateString() : "No Start Date"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {post.endDate ? new Date(post.endDate).toLocaleDateString() : "No End Date"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button
                onClick={() => handleEdit(post.id)}
                className="mr-4 text-blue-600 hover:text-blue-900"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewPosts;
