exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index", //! page_name
  }); //! http status codes mdn
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};
