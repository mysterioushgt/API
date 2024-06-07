const productModel = require('../models/Product')
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dnzs5c9q3',
    api_key: '661477146633168',
    api_secret: 'QyINe3Q4WivgC2eTmlsZoYwSDRc'
});

class ProductController{

    static getAllProducts = async(req,res) => {
        try{
            const products = await productModel.find()
            res.status(200).json({
                success: true,
                products
            })
        }catch(err){
            res.send(err)
        }
    }

    static getProductDetail = async(req,res) => {
        try{
            const productDetail = await productModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                productDetail
            })
        }catch(err){
            res.send(err)
        }
    }

    static getAdminProduct = async(req,res) => {
        try{
            const data = await productModel.find()
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            res.send(err)
        }
    }

    static deleteProduct = async(req,res) => {
        try{
            const data = await productModel.findByIdAndDelete(req.params.id)
            res
            .status(200)
            .send({ status: "success", message: "Product deleted successfully 😃🍻"});
        }catch(err){
            res.send(err)
        }
    }

    static createProduct = async(req,res) => {
        try{
            console.log(req.body)
            console.log(req.files)
            const file = req.files.images
            const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'userImage'
            })

            const {name, description, price, stock, rating, category} = req.body
            const data = new productModel({
                name: name,
                description: description,
                price: price,
                stock: stock,
                rating: rating,
                category: category,
                images: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
            })
            const insertedData = await data.save()
            // console.log(insertedData);
            res
            .status(201)
            .json({ status: "success", message: "Product added Successfully 😃🍻",insertedData});
        }catch(err){
            res.send(err)
        }
    }

   static updateProduct = async(req,res) => {
        const { id } = req.params;
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedProduct) {
              res.status(200).json(updatedProduct);
            } else {
              res.status(404).json({ message: 'Product not found' });
            }
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
    }

}


module.exports = ProductController