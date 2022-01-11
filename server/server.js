const express  = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json())
const SpotifyWebApi = require('spotify-web-api-node');

app.post("/login", (req, res) => { 
    console.log(req);
    const code = req.body.aCode;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000",
      clientId: "e953cd345ad94a68a50e603738c5ecb5",
      clientSecret: "ead60032bea8452ea5a83a6bf25fe505",
    })
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  })


app.listen(3001);