const PetModel = require("../models/petModel");

// CREATE PETS AND VALIDATION

const createPet = async (req, res) => {
    try{
        const { breedName, age, picture, cost, quantity } = req.body;
        if(!breedName) {
            return res.status(400).json({ message: "Breed name is required" });
        }

        if(!age) {
            return res.status(400).json({ message: "Age is required" });
        }

        if(!picture) {
            return res.status(400).json({ message: "Picture is required" });
        }

        if(!cost) {
            return res.status(400).json({ message: "Cost is required" });
        }
        
        if(!quantity) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        const newPet = await PetModel.create ({ 
            breedName,
             age, 
             picture, 
             cost,
             quantity
            });

        res.status(201).json({ message: "Pet created successfully",
             data: newPet });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "An error occurred while creating the pet" });
    }
}

// GET ALL PETS

const getPets = async (req, res) => {
    try{
        const pets = await PetModel.find();
        return res.status(200).json({message: "All pets fetched successfully",
            data: pets
        });
    }catch(error){
         console.log(error.message);
        res.status(500).json({ message: "Something went wrong can not dispaly all pets, try agian later" });
    }
};

//UPDATE A PET

const updatePet = async (req, res) => {
    try{
        const { id } = req.params;
        const  { breedName, age, picture, cost, quantity } = req.body;
        const pet = await PetModel.findById(id);
        
        if (!pet) {return res.status(404).json({message: "Pet not found"});
        }
        if (breedName) {pet.breedName = breedName
        }
        if (age) {
            pet.age = age;
        }
        if (picture) {
            pet.picture = picture;
        }
        if (cost) {
            pet.cost = cost;
        }
         if (quantity !== undefined) {
            pet.quantity = quantity;
        }
        await pet.save();

        return res.status(200).json({message: "pet updated successfully",
            data: pet
        });
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message: "Error while trying to update pet"});
    }
}

// DELETE A PET

const deletePet = async (req, res) => {
    try{
        const { id } = req.body;

        if(!id) {
            return res.status(400).json({message: "Pet id is required"});
        }

        const pet = await PetModel.findById(id);

        if(!pet) {
            return res.status(404).json({message: "pet not found"});
        }

        await PetModel.findByIdAndDelete(id);
        return res.status(200).json({message: "pet deleted successfully"});
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message: "Something went wrong while trying to delete pet, try again later"});
    }
}


// BUY A PET

const buyPet = async (req, res) =>{
    try{
        const { breedName } = req.body;

        if(!breedName){
            return res.status(400).json({message: "Breed Name is required"});
        }

        const pet = await PetModel.findOne({breedName});

        if(!pet){
            return res.status(404).json({message: "Pet not found"});
        }

        if(pet.quantity <= 0){
            return res.status(400).json({message: "Pet is out of stock"});
        }

        pet.quantity = pet.quantity -1;
        await pet.save();

        return res.status(200).json({message: "Pet purchased successfully",
            data: pet
        });

    }catch(error){
       console.log(error.message);
        return res.status(500).json({message: "Something went wrong while trying to purchase pet, try again later"});
    }

};

module.exports = { 
    createPet,
    getPets,
    updatePet,
    deletePet,
    buyPet
};