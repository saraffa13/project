const { default: mongoose } = require("mongoose")
const jwt = require('jsonwebtoken');
const request = require('supertest')
const {app} = require('../index');
const userModel = require("../models/user-model");
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URL)

    const mockUser = await userModel.create({
        name: "test",
        email: "test@example.com",
        password: "password",
        gender :"male",
        phoneNumber : 9801966700,
        address : "test address",
    })
    const token = await jwt.sign({
        _id: "ksdf9348skl398457jkls398457",
        role: "user",
        user: mockUser,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

})



afterAll(async () => {
    await mongoose.disconnect();
})

afterEach(async () => {
    await  userModel.deleteMany();
})

describe("user",()=>{

    let userId, userToken;
    describe("userRegistratioion", ()=>{
        it("should register a new user successfully",async()=>{
            const res = await request(app)
                .post('/user/register')
                .send({
                    name :"Test User",
                    email:"testUser@gmail.com",
                    password:"Test@123",
                    role:"user",
                    phoneNumber:9801966700,
                    gender:"male"
                })

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("message","User registered successfully!");

            const isUserInDb = await userModel.findOne({email:"testUser@gmail.com"})
            expect(isUserInDb).not.toBeNull();
            expect(isUserInDb.name).toBe("Test User");

            userId = isUserInDb._id;
        })
    })

})

