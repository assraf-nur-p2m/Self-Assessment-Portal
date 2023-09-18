import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import shaka from "shaka-player"; // Import Shaka Player

export default function CoreModule() {
  const { moduleId } = useParams();
  const [moduleInfo, setModuleInfo] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    fetch(`http://192.168.1.29:8081/admin/module/info/${moduleId}`)
      .then((res) => res.json())
      .then((data) => {
        data.videos = data.videos.sort((a, b) => a.sequence - b.sequence);
        data.documents = data.documents.sort((a, b) => a.sequence - b.sequence);
        setModuleInfo(data);
      });
  }, [moduleId]);

  useEffect(() => {
    if (selectedVideo) {
      const videoElement = document.getElementById("shaka-video");
      const player = new shaka.Player(videoElement);
      player
        .load(selectedVideo.fileUrl)
        .then(() => {
          console.log("Video loaded successfully");
          setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.error("Error loading video:", error);
          setIsVideoPlaying(false);
        });
    }
  }, [selectedVideo]);

  return (
    <div className="login-page p-6">
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-4xl mb-3 font-bold">{moduleInfo.moduleName}</h1>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/3">
            <video
              className="rounded-xl"
              id="shaka-video"
              controls
              autoPlay
              style={{ width: "100%" }}
              controlsList="nodownload"
            />
          </div>
          <div className="w-full lg:w-1/3 bg-[#150f2de1] p-4 rounded-xl mx-3 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Video List</h2>
            <ul className="mt-3">
              {moduleInfo.videos?.map((video, index) => (
                <li className="" key={index}>
                  <button
                    className={`mb-3 p-2 rounded-lg w-full font-semibold ${
                      isVideoPlaying && selectedVideo === video
                        ? "bg-green-500"
                        : "bg-white"
                    }`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    {video.videoName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/3 bg-[#150f2de1] p-4 rounded-xl mx-1 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Document List</h2>
            <ul className="mt-4">
              {moduleInfo.documents?.map((document, index) => (
                <li className="" key={index}>
                  <a
                    href={document.fileUrl}
                    target="_blank"
                    className="mb-3 p-2 rounded-lg w-full font-semibold bg-white"
                  >
                    {document.documentName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
