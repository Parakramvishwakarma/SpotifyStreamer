type genre = {
    selectedGenre: string,
    listGenres: string[]
}


type genreChange = (val: string) => void;

type playListChange = (newPlayList: any) => void;

type fetchTrack = (track:any) => void;

interface artists {
    name: string
}

type track = {
    artists: artists[];
    name: string;
    length: number;
    image: {
        height: number;
        width: number;
        url: string;
    };
    albumName: string;
    id: string;
}


type itrackSelector = (track: track) => void;