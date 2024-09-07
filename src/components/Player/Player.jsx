import React, { useState, useRef, useEffect } from "react";
import "./Player.css"; // Make sure the CSS is correctly imported
import Supra from "../../assets/supra.jpg";
import music from "../../assets/inslowmotion.mp3";
import repeat from "../../assets/repeat.png";
import backward from "../../assets/backward.png";
import play from "../../assets/play.png";
import pause from "../../assets/pause.png";
import forward from "../../assets/farward.png";
import shuffle from "../../assets/shufle.png";
/* const songs = [
  {
    title: "In Slow Motion",
    artist: "SoundBay",
    img: require("../../assets/supra.jpg"), // First song's image
    src: require("../../assets/inslowmotion.mp3"), // First song's audio file
  },
  {
    title: "Lover",
    artist: "Square A Saw",
    img: require("../../assets/LoverImg.jpg"), // Second song's image
    src: require("../../assets/Lover.mp3"), // Second song's audio file
  },
]; */
const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      setProgress((currentTime / duration) * 100);
      setCurrentTime(currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleBackward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const handleForward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  };

  const handleRepeat = () => {
    const audio = audioRef.current;
    audio.loop = !audio.loop;
  };

  const handleShuffle = () => {
    alert("Shuffle feature is not implemented yet!");
  };

  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPositionPercentage = (clickX / rect.width) * 100;
    const audio = audioRef.current;
    const newTime = (clickPositionPercentage / 100) * audio.duration;
    audio.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player">
      <div className="player-option">
        <img className="MusicImg" src={Supra} alt="album cover" />
        <h2>In Slow Motion</h2>
        <p>SoundBay</p>
      </div>

      <div className="progress-container">
        <span className="time-display">{formatTime(currentTime)}</span>
        <div
          className="progress-bar"
          ref={progressRef}
          onClick={handleProgressClick}
        >
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="time-display">{formatTime(duration)}</span>
      </div>

      <audio ref={audioRef} src={music}></audio>

      <div className="player-control-btns">
        <button className="control-btn" onClick={handleRepeat}>
          <img src={repeat} alt="repeat" />
        </button>
        <button className="control-btn" onClick={handleBackward}>
          <img src={backward} alt="backward" />
        </button>
        <button className="control-btn" onClick={togglePlayPause}>
          <img
            src={isPlaying ? pause : play}
            alt={isPlaying ? "pause" : "play"}
          />
        </button>
        <button className="control-btn" onClick={handleForward}>
          <img src={forward} alt="forward" />
        </button>
        <button className="control-btn" onClick={handleShuffle}>
          <img src={shuffle} alt="shuffle" />
        </button>
      </div>
    </div>
  );
};

export default Player;
