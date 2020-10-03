const mongoose = require('mongoose');

const popSchema = new mongoose.Schema({
  name: { type: String, required: '{PATH} is required!', unique: true },
  number_funko: { type: String, required: '{PATH} is required!', unique: true },
  franchise: { type: String, required: '{PATH} is required!' },
  url_image: { type: String, required: '{PATH} is required!', unique: true },
});

const Pop = mongoose.model('pop', popSchema);

module.exports = Pop;
