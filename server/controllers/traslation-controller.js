const cartModel = require("../models/cart-model");
const translationModel = require("../models/translation-model");

module.exports.getTranslation = async (req, res) => {

    try {
        let translationData = await translationModel.find()

        res.status(200).json({
            message: "Tranlation Data successfully retrived",
            data: translationData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports.addTranslation = async (req, res) => {

    const data = req.body

    try {
        let translationDocument = await translationModel.findOne(); 
    
        if (!translationDocument) {
            translationDocument = new translationModel({
                translations: {}
            });
        }
        
        data.forEach((translation)=>{
            const newTranslation = {
                [translation.key]: {
                    english:translation.english,
                    hindi:translation.hindi
                }
            };
            translationDocument.translations = {...translationDocument.translations,...newTranslation}

        })

    
        await translationDocument.save();
    
        res.status(200).json({
            message: "Translation Added!",
            data: translationDocument
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message 
        });
    }

}