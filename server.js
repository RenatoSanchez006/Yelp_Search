const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());

const YELP_URL = "https://api.yelp.com/v3/businesses/search?sort_by=rating&limit=10&term=food";
const TOKEN = "Bearer YXrkW4dpJlBQighxXzCcWTDt2NARR5fneA89zGGaZJUiJ46onv3CF85lZroTmkriNFqNZnQ6VMrfkzJSHciVtkiKzp1tgkAOIX2vzxkDtP9N5kkmqfvVJpUV0yeDYXYx";

app.get("/", (req, res) => {
  console.log("Hello server");
  res.send({ "Hello server": true });
});

app.get("/yelp/:city/:food", (req, res) => {
  console.log("/yelp", req.params.city, req.params.food);
  console.log(
    `${YELP_URL}&location=${req.params.city}&categories=${req.params.food}`
  );
  let config = {
    method: "GET",
    url: `${YELP_URL}&location=${req.params.city}&categories=${req.params.food}`,
    headers: {
      Authorization: TOKEN,
    },
  };
  axios(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error in the something0)");
      console.log(err);
    });
});

app.listen(3000, () => console.log("Server Running on port 3000"));
