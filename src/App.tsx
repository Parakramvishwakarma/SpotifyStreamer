import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from "react";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import Selector from "./components/Selector";
import TrackList from "./components/TrackList";
import Login from "./components/Login";
import { Drawer } from "@mui/material";
import Player from "./components/Player";
import "./App.css";
import { Container } from "@mui/material";
import { CircularProgress } from "@mui/material";
const App = () => {
  //this is hte variable that will habe the code when we get the access code from the query
  const aCode = new URLSearchParams(window.location.search).get("code");

  // hooks
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<track | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [trackInfoArray, setTrackInfoAray] = useState<any[]>([]);
  const [listGenre, setListGenre] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);


  // url to get authorisation code
  const authURL = `https://accounts.spotify.com/authorize?client_id=e953cd345ad94a68a50e603738c5ecb5&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  // useEffects
  // useEffect to pull the token from the server as soon as the Auth Code is received by the query
  useEffect(() => {
    if (aCode) {
      console.log("FETCH AUTH CODE: SUCCESS");
    } else {
      console.log(
        "FECTH AUTH CODE: FAILED ( make sure login button is pressed )"
      );
    }
  }, [aCode]);
  useEffect(() => {
    getToken();
  }, [aCode]);

  useEffect(() => {

    fetchGenres();
  }, [token]);


  // FUNCTIONS
  // function to get the token from the server

  const getToken = async () => {
    if (!sessionStorage.getItem("token")) {
      if (aCode) {
        const tokenResponse = await axios.post("http://localhost:3001/login", {
          aCode,
        });
        if (tokenResponse) {
          setToken(tokenResponse.data.accessToken);
          setRefreshToken(tokenResponse.data.refreshToken);
          setExpiresIn(tokenResponse.data.expiresIn);
          // storing the token in the session storage
          const someVarName = tokenResponse.data.accessToken;
          sessionStorage.setItem("token", someVarName);
          // storing done
          console.log("FETCH TOKEN: SUCCESS");
          console.log(tokenResponse.data.expiresIn, "expiriy");
        } else {
          console.log("FETCH TOKEN: ERORR FAILED TOKEN RESPONSE = NULL");
        }
      } else {
        console.log(
          "FETCH TOKEN REQUEST: CANNOT SET CONNECTION WITH SERVER BECAUSE NO AUTHORISATION CODE"
        );
      }
    } else {
      console.log(
        "FETCH TOKEN: NO NEED TO GET TOKEN AGAIN TOKEN ALREADY STORED"
      );
      setToken(sessionStorage.getItem("token"));
      console.log(sessionStorage.getItem("token"));
    }
  };

  //function to fecth and set the list of genres from the spotify API
  const fetchGenres = async () => {
    setIsLoading(true);
    if (token) {
      const genreResponse = await axios(
        "https://api.spotify.com/v1/browse/categories?locale=sv_AU",
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
      setListGenre(genreResponse.data.categories.items);
      console.log(listGenre, "GENRE FETCH: SUCCCESS");
      setIsLoading(false);
    } else {
      console.log("FETCHING GENRES: CANNOT FETCH GENRES TOKEN NOT SET, LOGIN.");
    }
  };

  //Function to retreive the list of playlists whenever a genre is selected
  const genreChanged = async (newGenre: string) => {
    setIsLoading(true);
    setSelectedGenre(newGenre);
    const playlistResponse = await axios(
      `https://api.spotify.com/v1/browse/categories/${newGenre}/playlists`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (playlistResponse) {
      console.log("FETCH PLAYLISTS: SUCCESS");
      setPlaylists(playlistResponse.data.playlists.items);
      setIsLoading(false);
    } else {
      console.log("FETCH PLAYLISTS: FAILED");
    }
  };

  // Function to pull the info of every track
  const getTrackInfo = async (id: number): Promise<track> => {
    const trackInfo = await axios(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
      //now that its fetched we will put the JSON information into an object and create an track array each track object has only hte info we need
    });

    const thisTrack: track = {
      artists: trackInfo.data.album.artists,
      image: trackInfo.data.album.images[0], // this is an image object wiht height width and the href = src
      name: trackInfo.data.name,
      length: trackInfo.data.duration_ms,
      albumName: trackInfo.data.album.name,
      id: trackInfo.data.id, /// this is the while track object made
    };
    console.log(`TRACK ${thisTrack.name} SUCCESSFULY FETCHED`);
    return thisTrack;
  };

  //Function to pull info of what songs in playlist
  const handlePlaylistChange = async (newPlaylist: any) => {
    console.log("FETCH PLAYLIST TRACKS: IN PROCESS");
    const tracksResponse = await axios(
      `https://api.spotify.com/v1/playlists/${newPlaylist.id}/tracks?limit=10`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );
    if (tracksResponse) {
      console.log("FETCH PLAYLIST TRACKS: SUCCESS");
      const responseTracks = tracksResponse.data.items;
      const apiTrackList: track[] = [];
      console.log("FECTHING TRACK INFO");
      setIsLoading(true);
      for (const t of responseTracks) {
        const id = t.track.id;
        const trackinfo = await getTrackInfo(id);
        apiTrackList.push(trackinfo);
      }
      setTrackInfoAray(apiTrackList);
      console.log("FETCH TRACK INFO: SUCCESSS");
      setIsLoading(false);
    }
  };

  //function to select song when we want to play
  const trackSelector = (track: track): void => {
    if (!selectedTrack) {
      console.log("PLAY TRACK/ OPEN DRAWER: SUCCESS");
      setSelectedTrack(track);
      setDrawerOpen(true);
    }
  };
  // create context for the 


  const handleDrawerClose = () => {
    setSelectedTrack(null);
    setDrawerOpen(false);
  };

  const AccessTokenContext = React.createContext<string | null>(null); 
 
  
  return (
    <div className="App">
      <Container style={{ display: "flex", justifyContent: "flex-start" }}>
        <a
          href="http://localhost:3000"
          style={{ display: "flex", marginLeft: "23%" }}
        >
          <img
            src="https://1000logos.net/wp-content/uploads/2021/04/Spotify-logo.png"
            alt="Spotify Logo"
            height="100px"
            width="180px"
          />
        </a>
        <h2
          className="header"
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            marginTop: "30px",
          }}
        >
          Spotify Playlist Searcher
        </h2>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => handleDrawerClose()}
        style={{ colorScheme: "light" }}
      >
        <AccessTokenContext.Provider value={token} >
        <Player accessToken={AccessTokenContext} track={selectedTrack} play={drawerOpen} />
        </AccessTokenContext.Provider>

      </Drawer>
      {aCode ? (
        <Selector
          genre={listGenre}
          genreChanged={genreChanged}
          playlists={playlists}
          playlistChanged={handlePlaylistChange}
        />
      ) : (
        <Login authURL={authURL} />
      )}
      {!isLoading ? (
        <TrackList
          trackObjList={trackInfoArray}
          trackSelector={trackSelector}
        />
      ) : (
        <div style={{ display: "flex", marginLeft: "49%", marginTop: "15%" }}>
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
};

export default App;
