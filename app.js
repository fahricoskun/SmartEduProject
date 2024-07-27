//Third party packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

//Çekirdek paketler

//Benim oluşturduklarım
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

const app = express();


//Connect DB
mongoose
  .connect("mongodb://localhost/smartedu-db")
  .then(() => console.log("Connected!"));


//Template Engine
app.set("view engine", "ejs");

//Middlewears
app.use(express.static("public")); //! static dosyalarımı belirledik -> public klasörü
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routers
app.use("/", pageRoute);
app.use("/courses", courseRoute);

// Sunucuyu başlatma
const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
