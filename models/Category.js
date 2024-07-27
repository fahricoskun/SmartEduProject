const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

CategorySchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true, // gereksiz bir karakter olursa yoksay string karakterlerden devam et
  });
  next();
});

// şablonu modele çeviriyoruz

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
