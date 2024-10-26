const { validationResult } = require("express-validator");
const medicineModel = require("../models/medicine-model")
const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: 'ddvef89nz',
    api_key: '348469487735628',
    api_secret: 'wVC6nRNvO46N0EaM58YKjF2JjNc'
});

module.exports.createMedicine = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const medicine = req.body

    try {
        let imageUrl = null;

        if (req.file) {
            const fileResponse = await cloudinary.uploader.upload(req.file.path, { folder: 'medicineImg' });
            imageUrl = fileResponse.secure_url;
        }
        const newMedicine = new medicineModel({ ...medicine, image_url: imageUrl, 'exp_date': new Date(medicine.exp_date).getTime() })
        await newMedicine.save()


        res.status(202).json({
            message: "Medicines created successfully",
            data: newMedicine
        })


    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Couldn't create medicine. Something went wrong!"
        })
    }

}

module.exports.editMedicine = async (req, res) => {

    const { medicine } = req.body;

    try {

        const fetchedMedicine = await medicineModel.findById(medicine._id);
        if (fetchedMedicine) {
            fetchedMedicine.name = medicine.name,
            fetchedMedicine.price = medicine.price,
            fetchedMedicine.inventory_quantity = medicine.inventory_quantity,
            fetchedMedicine.composition = medicine.composition
            fetchedMedicine.priceOff = medicine.priceOff
            fetchedMedicine.category = medicine.category
        }

        await fetchedMedicine.save();
        res.status(200).json({
            message: "Edited Successfully!"
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Couldn't edit medicine. Something went wrong!"
        })
    }

}

module.exports.getMedicine = async (req, res) => {

    try {

        const medicine = await medicineModel.find();

        res.status(202).json({
            message: "Here is the medicine",
            data: medicine
        })

    } catch (error) {
        res.status(404).json({
            message: "Couldn't create medicine. Something went wrong!"
        })
    }
}
