const express = require("express");
const app = express();
const axios = require("axios");

var cors = require("cors");
app.use(
  cors({
    origin: "https://192.168.241.2:3000"
  })
);
app.use(express.static("public"));

app.get("/currency", async function (req, res) {
  const result = await axios.get("http://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");
  res.header("Access-Control-Allow-Origin", "https://vwovyp-3000.preview.csb.app");
  res.send(result.data);
});

app.listen(8080, () => {
  console.log("alive");
});
