import React from "react";
import {
  BsPlayFill,
  BsRewindFill,
  BsSkipStartFill,
  BsSkipEndFill,
  BsFastForwardFill,
  BsPause,
  BsPauseFill,
} from "react-icons/bs";
import {FaRandom} from "react-icons/fa"

const Player = ({ isPlaying, onToogel, onPrev, onNext, onClick }) => {
  return (
    <div className="player">
      <div className="player-buttons">
        <button className="player-button" onClick={onClick}>
          <FaRandom></FaRandom>
        </button>
        <button className="player-button" onClick={onPrev}>
          <BsSkipStartFill />
        </button>

        <button className="player-button" onClick={onToogel}>
          {!isPlaying ? <BsPlayFill /> : <BsPauseFill />}
        </button>

        <button className="player-button" onClick={onNext}>
          <BsSkipEndFill />
        </button>
      </div>
    </div>
  );
};

export default Player;
