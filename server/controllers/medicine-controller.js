const medicineModel = require("../models/medicine-model")

module.exports.createMedicine = async (req, res) => {

    const medicinesList = req.body
    try {
        medicinesList.map(async (medicine)=>{
            const newMedicine = new medicineModel({
                ...medicine
            })
            await newMedicine.save()
        })
        
        const medicine = await medicineModel.find();
        res.status(202).json({
            message: "Medicines created successfully",
            data:medicine
        })
        
    }catch(error){
        res.status(404).json({
            message:"Couldn't create medicine. Something went wrong!"
        })
    }
}