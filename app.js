//Third party packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");

//Çekirdek paketler

//Oluşturulanlar
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

//Connect DB
mongoose
  .connect("mongodb://localhost/smartedu-db")
  .then(() => console.log("Connected!"));

//Template Engine
app.set("view engine", "ejs");

//Global Variable

global.userIN = null; //! userIN

//Middlewears
app.use(express.static("public")); //! static dosyalarımı belirledik -> public klasörü
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false, //herhangi bir değişiklik olmasa da session'u kaydet (force)
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/smartedu-db" }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//Routers
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/register", pageRoute);
app.use("/login", pageRoute);
app.use("/users", userRoute);

// Sunucuyu başlatma
const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
