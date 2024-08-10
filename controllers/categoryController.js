const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).redirect("/users/dashboard")
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {

    const category = await Category.findById(req.params._id);
    await Category.deleteOne(category);
    res.status(201).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};