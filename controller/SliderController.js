const SliderModel = require('../models/Slider');
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dnzs5c9q3', 
    api_key: '661477146633168', 
    api_secret: 'QyINe3Q4WivgC2eTmlsZoYwSDRc' 
  });
class SliderController {

    static display = async (req, res) => {
      try {
        const sliders = await SliderModel.find();
        res.status(200).json({
          success: true,
          sliders
        });
      } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }

      static insert = async (req, res) => {
        try {
          const file = req.files.image
          const imageUpload = await cloudinary.uploader.upload(file.tempFilePath , {
              folder: 'projectAPI'
          })
    
          const { title , description} = req.body;
          const newSlider = new SliderModel({
            title:title,
            description:description,
            image:{
                public_id:imageUpload.public_id,
                url:imageUpload.secure_url
            }
          });
          await newSlider.save();
          res.status(201).json(newSlider);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }

      static view = async (req, res) => {
        const { id } = req.params;
        try {
          const slider = await SliderModel.findById(id);
          if (slider) {
            res.status(200).json(slider);
          } else {
            res.status(404).json({ message: 'Slider not found' });
          }
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }

      static update = async (req, res) => {
        const { id } = req.params;
        try {
          const updatedSlider = await SliderModel.findByIdAndUpdate(id, req.body, { new: true });
          if (updatedSlider) {
            res.status(200).json(updatedSlider);
          } else {
            res.status(404).json({ message: 'Slider not found' });
          }
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }

      static delete = async (req, res) => {
        const { id } = req.params;
        try {
          const deletedSlider = await SliderModel.findByIdAndDelete(id);
          if (deletedSlider) {
            res.status(200).json({ message: 'Slider deleted successfully' });
          } else {
            res.status(404).json({ message: 'Slider not found' });
          }
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
}

module.exports = SliderController;