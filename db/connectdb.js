//mongodb connection

const mongoose = require('mongoose')
const liveUrl ='mongodb+srv://salonigarg152:saloni123@cluster0.4tcnyy4.mongodb.net/AdmissionPortal?retryWrites=true&w=majority&appName=Cluster0'

const connectDb = () => {
    return mongoose.connect(process.env.LIVE_URL)
        .then(() => {
            console.log("connected successfully");
        })
        .catch((err) => {
            console.log(err);
        });
}
module.exports = connectDb;