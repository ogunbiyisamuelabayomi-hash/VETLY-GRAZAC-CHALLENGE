const PetModel = require("../../models/petModel");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");

const {
    createPet,
    getPets,
    updatePet,
    deletePet,
    buyPet
} = require("../../controllers/petController");

jest.mock("../../models/petModel");
jest.mock("../../utils/uploadToCloudinary");

const mockResponse = () => {
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

describe("Pet Controller Unit Tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    // ================= CREATE PET =================

    test("should create pet successfully", async () => {

        const newPet = {
            _id: "pet123",
            breedName: "Labrador",
            age: 2,
            picture: "https://cloudinary.com/dog.jpg",
            cost: 120000,
            quantity: 5
        };

        uploadToCloudinary.mockResolvedValue(
            "https://cloudinary.com/dog.jpg"
        );

        PetModel.create.mockResolvedValue(newPet);

        const req = {
            body: {
                breedName: "Labrador",
                age: 2,
                cost: 120000,
                quantity: 5
            },
            file: {
                buffer: Buffer.from("fake image")
            }
        };

        const res = mockResponse();

        await createPet(req, res);

        expect(uploadToCloudinary).toHaveBeenCalledWith(req.file.buffer);

        expect(PetModel.create).toHaveBeenCalledWith({
            breedName: "Labrador",
            age: 2,
            picture: "https://cloudinary.com/dog.jpg",
            cost: 120000,
            quantity: 5
        });

        expect(res.status).toHaveBeenCalledWith(201);
    });


    test("should return 400 if breed name is missing", async () => {

        const req = {
            body: {
                age: 2,
                cost: 120000,
                quantity: 5
            },
            file: {
                buffer: Buffer.from("fake image")
            }
        };

        const res = mockResponse();

        await createPet(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should return 400 if age is missing", async () => {

        const req = {
            body: {
                breedName: "Labrador",
                cost: 120000,
                quantity: 5
            },
            file: {
                buffer: Buffer.from("fake image")
            }
        };

        const res = mockResponse();

        await createPet(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should return 400 if cost is missing", async () => {

        const req = {
            body: {
                breedName: "Labrador",
                age: 2,
                quantity: 5
            },
            file: {
                buffer: Buffer.from("fake image")
            }
        };

        const res = mockResponse();

        await createPet(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should return 400 if quantity is missing", async () => {

        const req = {
            body: {
                breedName: "Labrador",
                age: 2,
                cost: 120000
            },
            file: {
                buffer: Buffer.from("fake image")
            }
        };

        const res = mockResponse();

        await createPet(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should return 400 if picture is missing", async () => {

        const req = {
            body: {
                breedName: "Labrador",
                age: 2,
                cost: 120000,
                quantity: 5
            }
        };

        const res = mockResponse();

        await createPet(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    // ================= GET PETS =================

    test("should get all pets successfully", async () => {

        const pets = [
            {
                breedName: "Labrador",
                age: 2,
                cost: 120000,
                quantity: 5
            }
        ];

        PetModel.find.mockResolvedValue(pets);

        const req = {};

        const res = mockResponse();

        await getPets(req, res);

        expect(PetModel.find).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });


    // ================= UPDATE PET =================

    test("should update pet successfully", async () => {

        const pet = {
            breedName: "Labrador",
            age: 2,
            picture: "old-picture.jpg",
            cost: 120000,
            quantity: 5,
            save: jest.fn().mockResolvedValue(true)
        };

        PetModel.findById.mockResolvedValue(pet);

        const req = {
            params: {
                id: "pet123"
            },
            body: {
                breedName: "German Shepherd",
                age: 3,
                picture: "new-picture.jpg",
                cost: 150000,
                quantity: 4
            }
        };

        const res = mockResponse();

        await updatePet(req, res);

        expect(PetModel.findById).toHaveBeenCalledWith("pet123");

        expect(pet.save).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("should return 404 if pet to update is not found", async () => {

        PetModel.findById.mockResolvedValue(null);

        const req = {
            params: {
                id: "pet123"
            },
            body: {
                breedName: "German Shepherd"
            }
        };

        const res = mockResponse();

        await updatePet(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });


    // ================= BUY PET =================

    test("should buy pet successfully", async () => {

        const pet = {
            breedName: "Labrador",
            quantity: 5,
            save: jest.fn().mockResolvedValue(true)
        };

        PetModel.findOne.mockResolvedValue(pet);

        const req = {
            body: {
                breedName: "Labrador"
            }
        };

        const res = mockResponse();

        await buyPet(req, res);

        expect(PetModel.findOne).toHaveBeenCalledWith({
            breedName: "Labrador"
        });

        expect(pet.quantity).toBe(4);

        expect(pet.save).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("should return 400 if pet is out of stock", async () => {

        const pet = {
            breedName: "Labrador",
            quantity: 0
        };

        PetModel.findOne.mockResolvedValue(pet);

        const req = {
            body: {
                breedName: "Labrador"
            }
        };

        const res = mockResponse();

        await buyPet(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should return 404 if pet does not exist when buying", async () => {

        PetModel.findOne.mockResolvedValue(null);

        const req = {
            body: {
                breedName: "Labrador"
            }
        };

        const res = mockResponse();

        await buyPet(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });


    // ================= DELETE PET =================

    test("should delete pet successfully", async () => {

        const pet = {
            _id: "pet123",
            breedName: "Labrador"
        };

        PetModel.findById.mockResolvedValue(pet);

        PetModel.findByIdAndDelete.mockResolvedValue(pet);

        const req = {
            body: {
                id: "pet123"
            }
        };

        const res = mockResponse();

        await deletePet(req, res);

        expect(PetModel.findById).toHaveBeenCalledWith("pet123");

        expect(PetModel.findByIdAndDelete).toHaveBeenCalledWith("pet123");

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("should return 404 if pet to delete is not found", async () => {

        PetModel.findById.mockResolvedValue(null);

        const req = {
            body: {
                id: "pet123"
            }
        };

        const res = mockResponse();

        await deletePet(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

});