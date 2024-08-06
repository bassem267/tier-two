"use client";
import { useState } from "react";
import "./tabs.css";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../lib/firebase/firebase";

const CreatePost: React.FC = () => {
  const [post, setPost] = useState({ title: "", content: "", imageUrl: "", startDate: "", endDate: "" });
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (post.content !== "" && post.title !== "") {
      try {
        let imageUrl = "";
        if (image) {
          const imageRef = ref(storage, `posts/${image.name}`);
          const snapshot = await uploadBytes(imageRef, image);
          imageUrl = await getDownloadURL(snapshot.ref);
        }

        await addDoc(collection(db, "posts"), {
          title: post.title,
          content: post.content,
          imageUrl,
          startDate: post.startDate,
          endDate: post.endDate,
        });

        setSuccess("Post created successfully!");
        setError(null);
        setPost({ title: "", content: "", imageUrl: "", startDate: "", endDate: "" });
        setImage(null);
      } catch (err) {
        setError("Failed to create post. Please try again.");
        setSuccess(null);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            className="input mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={4}
            required
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
              }
            }}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={post.startDate}
            onChange={(e) => setPost({ ...post, startDate: e.target.value })}
            className="input mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={post.endDate}
            onChange={(e) => setPost({ ...post, endDate: e.target.value })}
            className="input mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create
        </button>
      </form>
      {success && <p className="mt-4 text-green-600">{success}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default CreatePost;
