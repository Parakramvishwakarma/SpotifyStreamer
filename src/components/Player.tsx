import SpotifyPlayer from "react-spotify-web-playback";
import React, {useContext} from "react";
import { Container } from "@mui/material";

interface playProps {
  accessToken: any;
  track: track | null;
  play: boolean;
}

const Player: React.FC<playProps> = ({ accessToken, track, play }) => { // access token passed through is now only context
  console.log(`SPOTIFY PLAYER: ${track?.name} `);

  const token: string = React.useContext(accessToken);
  return (
      <>
        <Container style={{display: "flex", justifyContent: "center", margin: "auto"}}>
      <img
        src={track?.image.url}
        alt="Track Image"
        height= "90%"
        width="90%"
        style={{ display: "flex",  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
      />
    </Container>
    <Container>
      <SpotifyPlayer
        token={token? token : ""}
        uris={[`spotify:track:${track?.id}`]}
        play={play}
      />
    </Container></>

  );
};

export default Player;
