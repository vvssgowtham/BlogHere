const mongoose = require('mongoose');

const RegisteruserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const BlogsSchema = new mongoose.Schema({
    imageURL : {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    blogcontent : {
        type: String,
        required: true,
    }, 
    //this idea obtained with the help of chatgpt for identifying the user who created the blog
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registeruser', // Reference to the Registeruser model
        required: true,
    },
});

const Registeruser = mongoose.model('Registeruser', RegisteruserSchema);
const Blogs = mongoose.model('Blogs', BlogsSchema);

// Export the models as properties of an object
module.exports = { Registeruser, Blogs };