import type {
    Dispatch,
    RefObject,
    SetStateAction,
    SyntheticEvent,
    ChangeEvent,
} from "react";

import type { SongInfo } from "../types";

import { useEffect, useRef, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import { PlayerContext } from "../contexts/player"

const notPlaying: SongInfo = {
    image: "/images/not-playing.png",
    sound: "",
    name: "Không Phát",
    artists: [],
};

const test: SongInfo = {
    ...notPlaying,
    sound: "http://localhost:4533/rest/getTranscodeStream?u=boo2013&t=4a89f7cb1b248167c8c00166bd3a82ce&s=6cacbd&f=json&v=1.8.0&c=NavidromeUI&mediaId=dm6tT0kUeW08zmBWFdhedk&mediaType=song&transcodeParams=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkcCI6dHJ1ZSwiZXhwIjoxNzg2MjM5NjcxLCJpc3MiOiJORCIsIm1pZCI6ImRtNnRUMGtVZVcwOHptQldGZGhlZGsiLCJ1YSI6MTc4NTU4NTg0N30.peUotWKCYn93RQDAO7CGSVVF97dwjgMRo3mNsRIPaPY",
} as SongInfo

interface PlayerProps {
    info: SongInfo | null;
    audioRef: RefObject<HTMLAudioElement | null>;
    setVolume: Dispatch<SetStateAction<number>>;
}

interface ExtraControlsProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    volume: number;
    setVolume: Dispatch<SetStateAction<number>>;
}

function formatTime(seconds: number) {
    if (!Number.isFinite(seconds)) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function MusicInfo({ info = null, imgsize = 80 }: { info?: SongInfo | null, imgsize?: number }) {
    return (
        <div className="d-flex" style={{ flex: 1 }}>
            <img width={imgsize} height={imgsize} style={{ objectFit: "cover" }} src={info?.image ?? "/images/not-playing.png"} />

            <div className="ms-3">
                <h6 className="mb-1">{info?.name ?? "Không phát"}</h6>

                <h2>
                    {
                        info?.artists.map((artist, index, artists) => (
                            <Fragment key={artist.id}>
                                <Link to={`/artist/${artist.id}`}>
                                    {artist.name}
                                </Link>

                                {index < artists.length - 1 && ", "}
                            </Fragment>
                        ))}
                </h2>
            </div>
        </div>
    );
}

function Player({ info, audioRef, setVolume }: PlayerProps) {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;

        setCurrentTime(0);
        setDuration(0);
        setIsPlaying(false);
    }, [info?.sound, audioRef]);

    function changeCurrentTime(
        e:
            | SyntheticEvent<HTMLAudioElement>
            | ChangeEvent<HTMLInputElement>
    ) {
        let time: number;

        if (e.currentTarget instanceof HTMLAudioElement) {
            time = e.currentTarget.currentTime;
        } else {
            time = Number(e.currentTarget.value);

            if (audioRef.current) {
                audioRef.current.currentTime = time;
            }
        }

        setCurrentTime(time);
    }

    function seekCurrentTime(amount: number) {
        const audio = audioRef.current;

        if (!audio) return;

        const time = Math.max(
            0,
            Math.min(audio.currentTime + amount, duration)
        );

        audio.currentTime = time;
        setCurrentTime(time);
    }

    async function togglePlay() {
        const audio = audioRef.current;

        if (!audio || !info?.sound) return;

        if (audio.paused) {
            try {
                await audio.play();
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                console.error("Failed to play audio:", error);
            }
        } else {
            audio.pause();
        }
    }

    return (
        <div className="flex-grow-1 d-flex flex-column align-items-center" style={{ flex: 2 }} >
            <div className="flex-lg-grow-1 d-flex">
                <button className="btn bg-transparent border-0 text-light" onClick={() => seekCurrentTime(-10)}>
                    <i className="fa fa-rotate-left" />
                </button>

                <button className="btn btn-light rounded-circle"
                    onClick={togglePlay} >
                    <i className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`} />
                </button>

                <button
                    className="btn bg-transparent border-0 text-light"
                    onClick={() => seekCurrentTime(10)}
                >
                    <i className="fa fa-rotate-right" />
                </button>

                <audio
                    ref={audioRef}
                    src={info?.sound}
                    onLoadedMetadata={(e) => {
                        setDuration(e.currentTarget.duration);
                    }}
                    onTimeUpdate={changeCurrentTime}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    onVolumeChange={(e) => {
                        setVolume(e.currentTarget.volume);
                    }}
                />
            </div>

            <div className="flex-grow-1 d-flex align-items-center gap-1">
                <p className="mb-0">{formatTime(currentTime)}</p>

                <input
                    type="range"
                    min="0"
                    max={duration}
                    step={0.1}
                    value={currentTime}
                    onChange={changeCurrentTime}
                />

                <p className="mb-0">{formatTime(duration)}</p>
            </div>
        </div>
    );
}

function ExtraControls({ audioRef, volume, setVolume }: ExtraControlsProps) {
    const [muted, setMuted] = useState(false);

    function switchMuted() {
        const newMuted = !muted;

        setMuted(newMuted);

        if (audioRef.current) {
            audioRef.current.muted = newMuted;
        }
    }

    function changeVolume(e: ChangeEvent<HTMLInputElement>) {
        const volume = Number(e.currentTarget.value);

        if (audioRef.current) {
            audioRef.current.volume = volume;
        }

        setVolume(volume);
    }

    return (
        <div
            className="flex-grow-2 d-flex flex-row-reverse"
            style={{ flex: 1 }}
        >
            <input
                type="range"
                min={0}
                max={muted ? 0 : 1}
                step={0.01}
                value={volume}
                onChange={changeVolume}
            />

            <button className="btn bg-transparent border-0 text-light" onClick={switchMuted}>
                <i className={`fa ${muted ? "fa-volume-xmark" : "fa-volume-high"}`} />
            </button>
        </div>
    );
}

export function MediaPlayer() {
    const { musicInfo } = useContext(PlayerContext);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(1);

    // window.musicInfo = musicInfo;
    // window.setMusicInfo = setMusicInfo;

    return (
        <div className="bg-dark text-light d-flex">
            <MusicInfo info={musicInfo} />

            <Player
                info={musicInfo}
                audioRef={audioRef}
                setVolume={setVolume}
            />

            <ExtraControls
                audioRef={audioRef}
                volume={volume}
                setVolume={setVolume}
            />
        </div>
    );
}