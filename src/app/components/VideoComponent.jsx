import { Video, buildSrc } from "@imagekit/next";
import Link from "next/link";

export default function VideoComponent({ video }) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        {/* <Link href={`/videos/${video._id}`} className="relative group w-full"> */}
        <div className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <Video
              // urlEndpoint={`https://ik.imagekit.io/${video._id}`}
              urlEndpoint={video.videoUrl}
              src={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              loading="lazy"
              poster={buildSrc({
                urlEndpoint: video.videoUrl,
                src: video.thumbnailUrl,
              })}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
            <div>
              <video src={video.videoUrl} width="1080" height="1920" controls />
            </div>
          </div>
        </div>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}