const express = require("express");
const app = express();
const axios = require("axios");

var cors = require("cors");
app.use(
  cors({
    origin: "http://127.0.0.1:3000"
  })
);

app.get("/currency", async function (req, res) {
  const result = await axios.get("http://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");
  res.send(result.data);
});

app.listen(8080, () => {
  console.log("connected");
});
