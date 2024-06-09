const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true

  },
  description: {
    type: String,
    required: true
  },
  image: {
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
  },
},{timestamps: true});

var SliderModel = mongoose.model('slider', SliderSchema);
module.exports = SliderModel;