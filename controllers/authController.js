const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);
    console.log(errors.array()[0].msg);

    for(let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }

    res.status(404).redirect("/register");
  }
};

exports.loginUser = async (req, res) => {
  try {
    //kullanıcının girdiği email ve passwordu almak
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {

        if(same){
          // user session
          req.session.userID = user._id; // hangi kullanıcı giriş yapmış
          res.status(200).redirect("/users/dashboard");
        } else {
          req.flash("error", "Şifre yanlış!");
          res.status(404).redirect("/login");
        }  
      });
    } else {
      req.flash("error", "Kullanıcı bulunamadı!");
      res.status(404).redirect("/login");
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
  const user = await User.findOne({ _id: req.session.userID }).populate("courses"); // user modeli içinde bulunan courses'e ulaşmak için
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  const users = await User.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
    users,
  });
};

exports.deleteUser = async (req, res) => {

  try {
    const user = await User.findById(req.params._id);
    console.log(user)
    await User.deleteOne(user);
    await Course.deleteMany({user:req.params._id});

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};