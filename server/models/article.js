const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: String,
  imageUrl: String,
  imageXOffsetPercent: Number,
  imageYOffsetPercent: Number,
  body: String,
  tags: Array,
}, { timestamps: true });

ArticleSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    imageUrl: this.imageUrl,
    imageXOffsetPercent: this.imageXOffsetPercent,
    imageYOffsetPercent: this.imageYOffsetPercent,
    body: this.body,
    tags: this.tags,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Article', ArticleSchema);