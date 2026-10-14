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
  const [volume, setVolume] = useState(0.5);
  const [audioError, setAudioError] = useState("");

  const audioRef = useRef(null);

  // Aggiorna il volume senza interrompere la traccia.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // L'audio continua a seguire la pausa della sessione.
  useEffect(() => {
    const audio = audioRef.current;
    let cancelled = false;

    if (!audio) return;

    if (shouldPlay) {
      audio
        .play()
        .then(() => {
          if (!cancelled) {
            setAudioError("");
          }
        })
        .catch((error) => {
          if (cancelled || error.name === "AbortError") return;

          setAudioError(
            error.name === "NotAllowedError"
              ? "Playback blocked. Press Retry audio."
              : "Unable to play this sound. Try another track."
          );
        });
    } else {
      audio.pause();
    }

    return () => {
      cancelled = true;
      audio.pause();
    };
  }, [shouldPlay, selectedTrack]);

  function handleTrackChange(event) {
    const track = tracks.find(
      (item) => item.name === event.target.value
    );

    if (track) {
      setAudioError("");
      setSelectedTrack(track);
    }
  }

  async function handleRetry() {
    const audio = audioRef.current;

    if (!audio || !shouldPlay) return;

    try {
      await audio.play();
      setAudioError("");
    } catch {
      setAudioError(
        "Unable to play this sound. Try another track."
      );
    }
  }

  return (
    <div>
      <label>
        🎵 Sound{" "}
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
      </label>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "10px",
        }}
      >
        Volume

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) =>
            setVolume(Number(event.target.value))
          }
          style={{ width: "90px" }}
        />

        <span>{Math.round(volume * 100)}%</span>
      </label>

      {audioError && (
        <div>
          <p role="alert">{audioError}</p>

          {shouldPlay && (
            <button type="button" onClick={handleRetry}>
              Retry audio
            </button>
          )}
        </div>
      )}

      <audio
        ref={audioRef}
        src={selectedTrack.src}
        loop
        onError={() =>
          setAudioError(
            "Audio file unavailable. Try another track."
          )
        }
      />
    </div>
  );
}

export default AudioPlayer;