const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: String,
  slug: String,
  image: String,
  imageXOffsetPercent: Number,
  imageYOffsetPercent: Number,
  summary: String,
  body: String,
  tags: Array,
  isPublished: Boolean
}, { timestamps: true });

ArticleSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    slug: this.slug,
    title: this.title,
    image: this.image,
    imageXOffsetPercent: this.imageXOffsetPercent,
    imageYOffsetPercent: this.imageYOffsetPercent,
    summary: this.summary,
    body: this.body,
    tags: this.tags,
    isPublished: this.isPublished,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Article', ArticleSchema);