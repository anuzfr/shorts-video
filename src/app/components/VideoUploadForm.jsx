"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Film, Image as ImageIcon, AlertCircle } from "lucide-react";

export default function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleVideoUpload = (result) => {
    setVideoUrl(result.url);
  };

  const handleThumbnailUpload = (result) => {
    setThumbnailUrl(result.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      setError("Please login to upload videos");
      return;
    }

    if (!title || !description || !videoUrl || !thumbnailUrl) {
      setError("Please fill all fields and upload both video and thumbnail");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const response = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      router.push("/");
    } catch (error) {
      setError("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-zinc-900 rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
          <Film className="w-6 h-6 text-indigo-400" />
          Upload Your Video
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-300 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter video description"
              rows={4}
              required
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Upload Video
            </label>
            <div className="relative p-4 bg-zinc-800 rounded-md border border-zinc-700 hover:border-indigo-500 transition-colors duration-200">
              <FileUpload
                fileType="video"
                onSuccess={handleVideoUpload}
                onProgress={(progress) =>
                  console.log("Video upload progress:", progress)
                }
              />
              {videoUrl && (
                <div className="mt-2 flex items-center gap-2 text-sm text-indigo-400">
                  <Film className="w-4 h-4" />
                  Video uploaded successfully
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Upload Thumbnail
            </label>
            <div className="relative p-4 bg-zinc-800 rounded-md border border-zinc-700 hover:border-indigo-500 transition-colors duration-200">
              <FileUpload
                fileType="image"
                onSuccess={handleThumbnailUpload}
                onProgress={(progress) =>
                  console.log("Thumbnail upload progress:", progress)
                }
              />
              {thumbnailUrl && (
                <div className="mt-2 flex items-center gap-2 text-sm text-indigo-400">
                  <ImageIcon className="w-4 h-4" />
                  Thumbnail uploaded successfully
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-700 rounded-md text-red-400 text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || !session}
            className={`w-full py-3 px-4 rounded-md font-medium text-zinc-100 transition-all duration-200 ${
              uploading || !session
                ? "bg-zinc-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-zinc-100"
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
                Uploading...
              </span>
            ) : (
              "Upload Video"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}