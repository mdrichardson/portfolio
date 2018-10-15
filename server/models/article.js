const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: String,
  imageUrl: String,
  imageYOffset: Number,
  body: String,
  tags: Array,
}, { timestamps: true });

ArticleSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    imageUrl: this.imageUrl,
    imageYOffset: this.imageYOffset,
    body: this.body,
    tags: this.tags,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Article', ArticleSchema);