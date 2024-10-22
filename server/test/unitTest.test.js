const { default: mongoose } = require("mongoose")
const jwt = require('jsonwebtoken');


beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URL)
    const token = await jwt.sign({
        _id: existingUser._id,
        role: existingUser.role,
        user: existingUser,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

})



afterAll(async () => {
    await mongoose.disconnect();
})



describe(()=>{
    it('should return 200 and user data', async () => {})
})