import { useEffect, useRef, useState } from "react";

const tracks = [
  {
    name: "Forest",
    src: `${import.meta.env.BASE_URL}audio/forest.mp3`,
  },
  {
    name: "Rain",
    src: `${import.meta.env.BASE_URL}audio/rain.mp3`,
  },
  {
    name: "Ocean",
    src: `${import.meta.env.BASE_URL}audio/ocean.mp3`,
  },
  {
    name: "Zen",
    src: `${import.meta.env.BASE_URL}audio/zen.mp3`,
  },
];

function AudioPlayer({ shouldPlay }) {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (shouldPlay) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [shouldPlay, selectedTrack]);

  function handleTrackChange(event) {
    const track = tracks.find(
      (item) => item.name === event.target.value
    );

    setSelectedTrack(track);
  }

  return (
    <div>
      <span>🎵 </span>

      <select
        value={selectedTrack.name}
        onChange={handleTrackChange}
      >
        {tracks.map((track) => (
          <option key={track.name} value={track.name}>
            {track.name}
          </option>
        ))}
      </select>

      <audio
        ref={audioRef}
        src={selectedTrack.src}
        loop
      />
    </div>
  );
}

export default AudioPlayer;