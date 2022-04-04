import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Vimeo from "@u-wave/react-vimeo";
import { StateContext } from "../Components/StateContext";
import axios from "axios";

const Video = () => {
  const { videos, setVideos } = React.useContext(StateContext);
  const [title, setTitle] = useState("");
  const [video_url, setVideo_url] = useState("");
  const [description, setDescription] = useState("");

  const addVideo = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/videos",
        {
          title,
          video_url,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setTitle("");
        setVideo_url("");
        setDescription("");
        setVideos([...videos, res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Video section</h1>

        <div>
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Add video
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Video
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="url">Video Url</label>
                    <input
                      type="text"
                      className="form-control"
                      id="url"
                      value={video_url}
                      onChange={(e) => setVideo_url(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addVideo}
                  >
                    Add video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {videos.map((video) => {
              return (
                <div key={video.id}>
                  <p> {video.title} </p>
                  <Vimeo
                    style={{ width: "100%", height: "100%" }}
                    video={video.video_url}
                    autoplay={true}
                    loop={true}
                    autopause={false}
                    playlist={[video.video_url]}
                  />
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      axios
                        .delete(
                          `http://127.0.0.1:8000/api/videos/${video.id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }
                        )
                        .then((res) => {
                          setVideos(videos.filter((v) => v.id !== video.id));
                        })
                        .catch((err) => {
                          console.log(err.response.data.message);
                        });
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
