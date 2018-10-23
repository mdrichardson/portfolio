var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
  img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Image', ImageSchema);