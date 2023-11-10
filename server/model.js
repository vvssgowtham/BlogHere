const mongoose = require('mongoose');

const Registeruser = new mongoose.Schema({
    email : {
        type : String,
        require : true,
        unique : true,
    },
    password : {
        type : String,
        require : true,
    }
})

module.exports = mongoose.model('Registeruser',Registeruser);//first argument is modelname and second is schema name