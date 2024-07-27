const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
});

CourseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true, // gereksiz bir karakter olursa yoksay string karakterlerden devam et
  });
  next();
});

// şablonu modele çeviriyoruz

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
