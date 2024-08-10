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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", //biz bu kursu oluştururken categoriler bu referanstan gelecek
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

CourseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true, // gereksiz bir karakter olursa yoksay string karakterlerden devam et
  });
  next();
});

// Virtual for formatted date
CourseSchema.virtual('formattedDate').get(function() {
  return new Date(this.createdAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Convert to JSON
CourseSchema.set('toJSON', { virtuals: true });
CourseSchema.set('toObject', { virtuals: true });

// şablonu modele çeviriyoruz

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
