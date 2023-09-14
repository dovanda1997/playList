import { useState, useRef, useEffect } from "react";

import "./App.css";
import Player from "./component/Player";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { CiVolumeHigh } from "react-icons/ci";

const songs = [
  {
    id: 1,
    title: "See Tình",
    artist: {
      name: "Hoàng Thùy Linh",
      avatar:
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/10/6/842256/Hoang-Thuy-Linh-2.jpg",
    },
    cover:
      "https://avatar-ex-swe.nixcdn.com/song/share/2022/02/20/5/f/b/1/1645341333426.jpg",
    src: "see-tinh.mp3",
  },
  {
    id: 2,
    title: "Gió",
    artist: {
      name: "JanK x Quanvrox",
      avatar:
        "https://gocdoday.com/wp-content/uploads/2023/03/loi-bai-hat-gio-jank.jpg",
    },
    cover:
      "https://gocdoday.com/wp-content/uploads/2023/03/loi-bai-hat-gio-jank.jpg",
    src: "GioLofi-Jank1967-8874174.mp3",
  },
  {
    id: 3,
    title: "Chuyện Đôi Ta",
    artist: {
      name: "EmceeL x DaLAB",
      avatar: "https://i.ytimg.com/vi/6eONmnFB9sw/maxresdefault.jpg",
    },
    cover: "https://i.ytimg.com/vi/6eONmnFB9sw/maxresdefault.jpg",
    src: "ChuyenDoiTa-EmceeLDaLAB-7120974.mp3",
  },
  {
    id: 4,
    title: "Đào Nương",
    artist: {
      name: "Hoàng Vương",
      avatar: "https://i.ytimg.com/vi/PM9Vc_agAqg/maxresdefault.jpg",
    },
    cover: "https://i.ytimg.com/vi/PM9Vc_agAqg/maxresdefault.jpg",
    src: "DaoNuong-HoangVuong-7037330.mp3",
  },
  {
    id: 5,
    title: "Sang Xịn Mịn",
    artist: {
      name: "BuongHoang x YoungMilo",
      avatar:
        "https://i.ytimg.com/vi/FOOMdJeTBWY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEkgLSh_MA8=&rs=AOn4CLBdnixlLjzHkSKNErBVtALaQ2N7fg",
    },
    cover:
      "https://i.ytimg.com/vi/FOOMdJeTBWY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEkgLSh_MA8=&rs=AOn4CLBdnixlLjzHkSKNErBVtALaQ2N7fg",
    src: "SangXinMinFtBuongHangTvtRemix-YoungMilo-8695705.mp3",
  },
];

function App() {
  const audioRef = useRef(new Audio());

  const [curentSongIndex, setCurentSongIndex] = useState(-1); // Trạng thái bài hát

  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái bật tắt nhạc
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCurrentTimeChange, setIsCurrentTimeChange] = useState(false);
  const [volume, setVolume] = useState(1);

  const toogelPlay = () => {
    // Bật tắt nhạc
    if (curentSongIndex === -1) {
      setCurentSongIndex(1);
    }
    setIsPlaying(!isPlaying); // sau khi trạng thái thay đỏi
  };

  const toggleRandom = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurentSongIndex(randomIndex);
    audioRef.current.play;
  };

  const preSong = () => {
    // lùi 1 bài
    setCurentSongIndex((curentIndex) =>
      curentIndex === 0 ? songs.length - 1 : curentSongIndex - 1
    );
  };
  const nextSong = () => {
    // tiến 1 bài
    setCurentSongIndex((curentIndex) => (curentIndex + 1) % songs.length);
  };

  const selectSong = (id) => {
    const songIndex = songs.findIndex((s) => s.id === id);
    if (songIndex !== -1) {
      audioRef.current.play;
      setCurentSongIndex(songIndex);
    }
  };

  const handelTimeDragStar = () => {
    setIsCurrentTimeChange(true);
  };

  const handelTimeDragEnd = () => {
    setIsCurrentTimeChange(false);
  };

  const handelVolumeChange = (value) => {
    audioRef.current.volume = value;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleTimeChange = () => {
      setCurrentTime(audio.currentTime);
    };

    const handelVolumeChange = () => {
      setVolume(audio.volume);
    };

    const handelEnd = () => {
      nextSong();
    };

    audio.addEventListener("volumechange", handelVolumeChange);
    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("timeupdate", handleTimeChange);
    audio.addEventListener("ended", handelEnd);

    return () => {
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("timeupdate", handleTimeChange);
      audio.removeEventListener("volumechange", handelVolumeChange);
      audio.removeEventListener("ended", handelEnd);
    };
  }, []);

  // volume am nhac

  useEffect(() => {
    if (curentSongIndex !== -1) {
      const curentSong = songs[curentSongIndex];
      audioRef.current.src = curentSong.src;
    }
  }, [curentSongIndex]);

  useEffect(() => {
    if (isCurrentTimeChange && audioRef.current.playing) {
      audioRef.current.pause();
    } else if (curentSongIndex !== -1 && isPlaying) {
      audioRef.current.play(); // curent truy cập giá trị audio
    } else {
      audioRef.current.pause();
    }
  }, [curentSongIndex, isPlaying, isCurrentTimeChange]);

  // Thông tin bài đang phát
  const curentSong = songs[curentSongIndex];

  return (
    <>
      <h1 className="text-center m-t-20">MP3</h1>
      <div className="music grid m-t-20">
        <div className="music-infomation">
          {curentSong && (
            <div>
              <h4 className="m-b-15">NowPlaying</h4>
              <div className="music-title m-b-15">
                <p>{curentSong.title}</p>
              </div>
              <div className="music-name m-b-15">
                <p>{curentSong.artist.name}</p>
              </div>
              <div className="music-image">
                <img src={curentSong.cover} alt={curentSong.title}></img>
              </div>
            </div>
          )}
        </div>

        <div className="music-list">
          {songs.map((s) => {
            return [
              <table>
                <tr
                  key={s.id}
                  onClick={() => {
                    selectSong(s.id);
                  }}
                >
                  <td style={{ width: "5%" }}>
                    {curentSong && curentSong.id == s.id ? (
                      <BsPauseFill />
                    ) : (
                      <BsPlayFill />
                    )}
                  </td>
                  <td className="tit-img">
                    <img className="img-title" src={s.cover} alt="" /> {s.title}
                  </td>
                  <td style={{ textAlign: "end" }}>{s.artist.name}</td>
                </tr>
              </table>,
            ];
          })}
        </div>
      </div>
      <div className="music-content">
        <div>
          {curentSong && (
            <div>
              <img
                className="img-thumb"
                src={curentSong.cover}
                alt={curentSong.title}
              ></img>
            </div>
          )}
        </div>
        <div className="text-center">
          <Player
            isPlaying={isPlaying}
            onToogel={toogelPlay}
            onPrev={preSong}
            onNext={nextSong}
            onClick={toggleRandom}
          />
          <div className="currentAudio">
            <span className="current-time">{currentTime}</span>
            <input
              type="range"
              step={1}
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
              }}
              onMouseDown={handelTimeDragStar}
              onMouseUp={handelTimeDragEnd}
            />
            <span className="duration">{(duration / 60).toFixed(2)}</span>
          </div>
        </div>
        <div className="VolumeSong">
          <span className="current-time">
            <CiVolumeHigh />
          </span>
          <input
            type="range"
            step={0.01}
            min={0}
            max={1}
            value={volume}
            onChange={(e) => handelVolumeChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
