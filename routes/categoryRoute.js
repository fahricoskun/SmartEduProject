const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(categoryController.createCategory); // http://localhost:3000/categories linkine gider "/" ise bu linke git demek aslında
router.route('/:_id').delete(categoryController.deleteCategory); // https://localhost:3000/categories

module.exports = router;