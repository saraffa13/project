const medicineModel = require("../models/medicine-model")

module.exports.createMedicine = async (req, res) => {

    const { medicineList } = req.body

    try {
        medicineList.map(async (medicine) => {
            const newMedicine = new medicineModel({ ...medicine, 'exp_date': new Date(medicine.exp_date).getTime() })
            await newMedicine.save()
        })

        const medicine = await medicineModel.find();


        res.status(202).json({
            message: "Medicines created successfully",
            data: medicine
        })


    } catch (error) {
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