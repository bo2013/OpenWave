import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Navbar, MediaPlayer } from "."
import { PlayerContext } from "../contexts/player"
import type { SongInfo } from "@openwave/types"

export function AppLayout() {
    const [musicInfo, setMusicInfo] = useState<SongInfo | null>(null);

    return (
        <PlayerContext.Provider value={{ musicInfo, setMusicInfo }}>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                
                <div className="flex-grow-1 d-flex">
                    <Outlet />
                </div>

                <MediaPlayer />
            </div>
        </PlayerContext.Provider>
    )
}