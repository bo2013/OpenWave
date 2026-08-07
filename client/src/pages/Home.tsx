import type { SongInfo } from "../types";

import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { PlayerContext } from "../contexts/player";

function MusicCard({ info }: { info: SongInfo }) {
    const { setMusicInfo } = useContext(PlayerContext);

    function playMusic() {
        setMusicInfo(info);
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={info.image} className="card-img-top" alt={info.name} />
            <div className="card-body d-flex justify-content-between w-100 align-items-center">
                <div>
                    <h5 className="card-title">{info.name}</h5>
                    <p className="card-text">
                        {
                            info.artists.map((artist, index) => (
                                <Fragment key={artist.id}>
                                    <Link to={`/artist/${artist.id}`}>
                                        {artist.name}
                                    </Link>
                                    {index < info.artists.length - 1 && ", "}
                                </Fragment>
                            ))
                        }
                    </p>
                </div>
                <button 
                    className="btn btn-success rounded-circle d-flex align-items-center justify-content-center" 
                    style={{ width: "40px", height: "40px", padding: 0 }}
                    onClick={playMusic}
                >
                    <i className="fa fa-play" />
                </button>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
}

export function Home() {
    const testinfo: SongInfo = {
        image: "",
        name: "Mis-Take RPG",
        artists: [
            {
                id: "AnythingBecomeMoe",
                name: "AnythingBecomeMoe"
            }
        ],
        sound: "http://localhost:4533/rest/getTranscodeStream?u=boo2013&t=fcd7ee40f0b8df46b428d483b0aec4c3&s=14c926&f=json&v=1.8.0&c=NavidromeUI&mediaId=dm6tT0kUeW08zmBWFdhedk&mediaType=song&transcodeParams=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkcCI6dHJ1ZSwiZXhwIjoxNzg2MDI0NzI0LCJpc3MiOiJORCIsIm1pZCI6ImRtNnRUMGtVZVcwOHptQldGZGhlZGsiLCJ1YSI6MTc4NTU4NTg0N30.jRBD1xthM6sTIEm69_n3Z7DRDbeYa8F7kH4ynWz3gtw"
    }

    return (
        <div>
            <aside>
            </aside>
            <main>
                <MusicCard info={testinfo} />
            </main>
        </div>
    )
}