const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagSchema = new Schema({
  name: String
}, { timestamps: true });

TagSchema.methods.toJSON = function() {
  return {
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Tag', TagSchema);