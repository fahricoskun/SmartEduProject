const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Index Sayfasi"); //! http status codes mdn
});

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
