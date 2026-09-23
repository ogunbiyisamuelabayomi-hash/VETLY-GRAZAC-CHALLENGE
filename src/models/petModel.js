const mongoose = require ("mongoose");

const petSchema = new mongoose.Schema({
    breedName: {type: String, reqired: true},
    age: {type: Number, required: true},
    picture: {type: String, reqired: true},
    cost: {type: Number, reqired: true},
    quantity:{type: Number, required: true},
},{timestamps : true})

const PetModel= mongoose.model("Pet", petSchema);
module.exports = PetModel;