const mongoose = require('mongoose');

const popSchema = new mongoose.Schema({
  name: String,
  number_funko: Number,
  franchise: String,
  url_image: String,
});

const Pop = mongoose.model('pop', popSchema);

module.exports = Pop;
