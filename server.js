const express = require("express");
const cors = require("cors");

const hostname = "127.0.0.1";
const port = 5501;

const app = express();
app.use(cors());


const Banker = require("./module/banker");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post("/api/calcNeed", (req, res) => {
  const P = req.body.P;
  const R = req.body.R;
  const request = req.body.request;
  const allocation = req.body.allocation;

  const need = Banker.calcNeed(P, R, request, allocation);

  res.json({ need });
});

app.post("/api/banker", (req, res) => {
  const P = req.body.P;
  const R = req.body.R;
  const request = req.body.request;
  const allocation = req.body.allocation;
  const available = req.body.available;

  const result = Banker.isSafe(P, R, request, allocation, available);

  res.json({ result });
});

app.post("/api/available", (req, res) => {
  const P = req.body.P;
  const R = req.body.R;
  const request = req.body.request;
  const allocation = req.body.allocation;
  const available = req.body.available;

  const result = Banker.calculateWorkMatrix(P, R, request, allocation, available);

  res.json({ result });
});

app.listen(port, hostname, () => {
  console.log(`Server is listening on http://${hostname}:${port}`);
});
