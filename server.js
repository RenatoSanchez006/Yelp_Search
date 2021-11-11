const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());

const YELP_URL = "https://api.yelp.com/v3/businesses/search?sort_by=rating&limit=10";
const { TOKEN } = require("./config");

app.get("/", (req, res) => {
  console.log("Hello server");
  res.send({ "Hello server": true });
});

app.get("/yelp/:city/:food", (req, res) => {
  let config = {
    method: "GET",
    url: `${YELP_URL}&location=${req.params.city}&term=${req.params.food}`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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
