"use client";
import { useState } from "react";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <>
    <div className="w-2/12 mx-auto"></div>
      <div className="w-8/12 mx-auto">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("create")}
            className={`p-4 ${
              activeTab === "create" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Create Post
          </button>
          <button
            onClick={() => setActiveTab("view")}
            className={`p-4 ${
              activeTab === "view" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            View Posts
          </button>
        </div>
        <div className="p-4">
          {activeTab === "create" ? <CreatePost /> : <ViewPosts />}
        </div>
      </div>
      <div className="w-2/12 mx-auto"></div>
    </>
  );
}
