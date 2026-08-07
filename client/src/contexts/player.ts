import type { Dispatch, SetStateAction } from "react";

import type { SongInfo } from "@openwave/types";
import { createContext } from "react";

export interface PlayerContextType {
    musicInfo: SongInfo | null;
    setMusicInfo: Dispatch<SetStateAction<SongInfo | null>>;
}

export const PlayerContext = createContext<PlayerContextType>({
    musicInfo: null,
    setMusicInfo: () => {},
});