export interface ArtistInfo {
    id: string;
    name: string;
}

export interface SongInfo {
    name: string,
    image: string,
    sound: string,
    artists: ArtistInfo[]
}