import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.post("/submit", (req, res) => {
  const URL = req.body.QR;

  try {
    res.setHeader("Content-Type", "image/png"); 
    const qrPng = qr.image(URL, { type: "png" });
    qrPng.pipe(res);
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).send("Failed to generate QR code.");
  }
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
