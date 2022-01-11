import { Autocomplete , Button, TextField} from "@mui/material";
import { borderRadius } from "@mui/system";
import { ChangeEvent, useEffect} from "react";


type selectorProps = {
    genre: any[];
    genreChanged: genreChange;
    playlists: any[];
    playlistChanged: playListChange;

}


const Selector: React.FC<selectorProps> = ({genre, genreChanged, playlists, playlistChanged})  => {
    //useEffect to just confirm that the genre list is recieved by the selector 
    useEffect(() => {
        if(genre) {
            console.log("GENRE LIST SENT TO SELECTOR")
        }
    }, [genre])

    //FUNCTIONS    
    const handleGenreChange = (e: ChangeEvent<{}>, data : (any| null)) => {
        if (data) {
            genreChanged(data.id);
            console.log(data.id, "GENRE CHANGED: THE GENRE IS SELECTED");
        }
    }
    const handlePlaylistChange= (e: ChangeEvent<{}>, data : (any| null)) =>{
        if (data) {
            console.log("PLAYLIST SELECT: PLAYLIST SELECTED")
            playlistChanged(data);
        } 
    }


    return (
        <div className="dropdown" style={{display: "flex", justifyContent: "space-evenly"} }>
            <Autocomplete
            sx={{width: "40%", colorScheme: "light", borderRadius: "10px"}}
            options={genre}
            getOptionLabel={(userList: any) =>
                userList.name}
            renderInput={(params) => (
              <TextField {...params} label="Genre" variant="standard" />
            )}
            autoSelect={true}
            onChange={handleGenreChange}
          />
          <Autocomplete
            sx={{width: "40%", color: "#1DB954", backgroundColor: "#1DB954", borderRadius: "3px", colorScheme: "dark"}}
            options={playlists}
            getOptionLabel={(playlist: any) =>
                playlist.name}

            renderInput={(params) => (
              <TextField {...params} label="Playlist" variant="standard" />
            )}
            autoSelect={true}
            onChange={handlePlaylistChange}
          />
        </div>
    )
    
}

export default Selector;