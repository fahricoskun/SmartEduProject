const bcrypt = require("bcrypt");

const User = require("../models/User");
const Category = require("../models/Category");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    //kullanıcının girdiği email ve passwordu almak
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // user session
          req.session.userID = user._id; // hangi kullanıcı giriş yapmış
          res.status(200).redirect("/users/dashboard");
        }
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
      s,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
  });
};
