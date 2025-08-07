"use client";

import React, { useState, useEffect } from "react";
import VideoFeed from "./components/VideoFeed";
import Header from "./components/Header";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/video", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // console.log("response : ", response.json());
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load videos. Please try again later.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {("error: ", console.log(error))}
      <main className="container mx-auto px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-semibold text-zinc-100 mb-6 text-center">
          Latest Videos
        </h1>
        {loading && (
          <div className="flex justify-center items-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 justify-center py-4">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {!loading && !error && videos.length === 0 && (
          <div className="text-center text-zinc-400 py-12">
            No videos available. Upload a video to get started!
          </div>
        )}
        {!loading && !error && videos.length > 0 && (
          <VideoFeed videos={videos} />
        )}
      </main>
    </div>
  );
}