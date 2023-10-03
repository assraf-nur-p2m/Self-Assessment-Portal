import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shaka from "shaka-player";

export default function CoreModule() {
  const { moduleId } = useParams();
  const [moduleInfo, setModuleInfo] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [displayDocument, setDisplayDocument] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentButton, setSelectedDocumentButton] = useState(null);
  const navigate = useNavigate();
  const [videoPlaybackPositions, setVideoPlaybackPositions] = useState({});
  const [isNoticeVisible, setIsNoticeVisible] = useState(true);
  const [isQuizVisible, setIsQuizVisible] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://192.168.1.3:8081/admin/module/info/${moduleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.videos = data.videos.sort((a, b) => a.sequence - b.sequence);
        data.documents = data.documents.sort((a, b) => a.sequence - b.sequence);
        setModuleInfo(data);
      });
  }, [moduleId]);

  useEffect(() => {
    if (selectedVideo && !displayDocument) {
      const videoElement = document.getElementById("shaka-video");
      const player = new shaka.Player(videoElement);
      const storageKey = `videoPosition_${selectedVideo.id}`;
      const savedPosition = videoPlaybackPositions[storageKey];

      player
        .load(selectedVideo.fileUrl)
        .then(() => {
          console.log("Video loaded successfully");
          if (savedPosition) {
            videoElement.currentTime = parseFloat(savedPosition);
          }
          videoElement.addEventListener("timeupdate", () => {
            const updatedPositions = { ...videoPlaybackPositions };
            updatedPositions[storageKey] = videoElement.currentTime.toString();
            setVideoPlaybackPositions(updatedPositions);
          });

          videoElement
            .play()
            .then(() => {
              setIsVideoPlaying(true);
            })
            .catch((error) => {
              console.error("Error playing video:", error);
              setIsVideoPlaying(false);
            });
        })
        .catch((error) => {
          console.error("Error loading video:", error);
          setIsVideoPlaying(false);
        });
    }
  }, [selectedVideo, displayDocument]);

  useEffect(() => {
    // Check if the current time is within the notice's start and end times
    const currentTime = new Date();
    const noticeStartTime = new Date(moduleInfo.noticeStartTime);
    const noticeEndTime = new Date(moduleInfo.noticeEndTime);

    if (currentTime < noticeStartTime || currentTime > noticeEndTime) {
      // If the current time is outside the notice period, hide the notice
      setIsNoticeVisible(false);
    }

    // Check if the current time is within the quiz's start and end times
    const quizStartTime = new Date(moduleInfo.examStartTime);
    const quizEndTime = new Date(moduleInfo.examEndTime);

    if (currentTime < quizStartTime || currentTime > quizEndTime) {
      // If the current time is outside the quiz period, hide the quiz button
      setIsQuizVisible(false);
    }
  }, [moduleInfo]);

  const handleDocumentClick = (document) => {
    setSelectedVideo(null);
    setSelectedDocument(document);
    setDisplayDocument(true);
    setSelectedDocumentButton(document);
  };

  const giveQuiz = () => {
    navigate(`/quiz?moduleId=${moduleId}`);
  };

  return (
    <div className="login-page p-6">
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-4xl mb-3 font-bold">{moduleInfo.moduleName}</h1>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/3">
            {displayDocument ? (
              <iframe
                src={
                  displayDocument && selectedDocument
                    ? selectedDocument.fileUrl
                    : ""
                }
                className="rounded-xl"
                style={{ width: "100%", height: "580px" }}
                title="Document Viewer"
              ></iframe>
            ) : (
              <video
                className="rounded-xl"
                id="shaka-video"
                controls
                autoPlay
                style={{ width: "100%" }}
                controlsList="nodownload"
              />
            )}
          </div>
          <div
            id="content-list"
            className="w-full lg:w-1/3 bg-[#150f2de1] p-4 rounded-xl ms-4 shadow-lg"
            style={{ overflowY: "auto" }}
          >
            <div>
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
                      onClick={() => {
                        setSelectedVideo(video);
                        setDisplayDocument(false);
                        setSelectedDocumentButton(null);
                      }}
                    >
                      {video.videoName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Document List
              </h2>
              <ul className="mt-4">
                {moduleInfo.documents?.map((document, index) => (
                  <li className="" key={index}>
                    <button
                      className={`mb-3 p-2 rounded-lg w-full font-semibold ${
                        selectedDocumentButton === document
                          ? "bg-green-500 text-white"
                          : "bg-white"
                      }`}
                      onClick={() => handleDocumentClick(document)}
                    >
                      {document.documentName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between pe-1 mt-4">
          <div className="news-ticker w-4/4">
            {isNoticeVisible && (
              <div className="news-item">
                <p className="text-2xl mb-0 font-bold">{moduleInfo.notice}</p>
              </div>
            )}
          </div>
          <div className="w-2/4 flex justify-end">
            {isQuizVisible && (
              <button
                onClick={giveQuiz}
                className="p-3 bg-green-600 rounded-lg font-bold px-12 text-white"
              >
                Attempt Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
