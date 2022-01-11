import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { PlayArrow } from "@mui/icons-material";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
} from "@mui/material";
import Player from "./Player";

interface trackItemProps {
  track: track;

  trackSelector: itrackSelector;
}
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TrackItem: React.FC<trackItemProps> = ({ track, trackSelector }) => {
  const [artists, setArtists] = useState<string[]>([]);

  useEffect(() => {
    const names: string[] = [];
    if (track.artists) {
      for (const artist of track.artists) {
        names.push(artist.name);
      }
      setArtists(names);
    }
  }, [track.artists]);

  const handleClick = () => {
    console.log(`ITEM PLAYBUTTON PRESSED: SETTING SELECTD SONG`);
    trackSelector(track);
  };

  return (
    <Grid item xs={6}>
      {" "}
      <Item style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "#1DB954",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          style={{
            backgroundColor: "black",
            width: "80%",
            height: "150px",
            marginBottom: "10px",
          }}
        >
          <CardMedia
            style={{ display: "flex", justifyContent: "flex-end" }}
            component="img"
            sx={{ width: 151 }}
            image={track.image.url}
            alt="album covers"
          />
          <Box sx={{display: "flex", flexDirection: "column"}}>
          <CardContent sx={{ flex: '1 0 auto'}}>
          <Typography component="div" variant="body2">
            {track.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {artists}
          </Typography>
          </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', pl: 1, pb: 1 }}>
            <IconButton
              aria-label="play/pause"
              onClick={() => handleClick()}
              sx={{
                display: "flex",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "#1DB954",
                },
                position: "static"
              }}
            >
              <PlayArrow sx={{ height: 38, width: 38 }} />
            </IconButton>
            </Box>
          </Box>

        </Card>
      </Item>
    </Grid>
  );
};
export default TrackItem;
