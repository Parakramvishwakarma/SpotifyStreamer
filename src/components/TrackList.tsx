import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TrackItem from "./TrackItem";
import { Container } from '@mui/material';

interface listProps {
    trackObjList: track[];
    trackSelector: itrackSelector;
  }
  



const TrackList: React.FC<listProps> = ({trackObjList, trackSelector}) => {

  return (
    <Container sx={{ display: "flex", width: "100%", justifyContent:"center"}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3, display: "flex", width: "100%", justifyContent:"center"}}>
      {trackObjList.map((track) => (
        <TrackItem key={track.id} track={track} trackSelector={trackSelector} />
      ))}
      </Grid>
    </Container>
  );
}

export default TrackList;