const jwt = require('jsonwebtoken')

const userModel = require('../models/user-model');
const blackListTokenModel = require('../models/blacklist-token-model');

const isActive = async (req, res, next) => {
    try {
        const { email } = req.body;
        const latestUser = await userModel.findOne({ email });
        if (!latestUser || latestUser.isActive === false || latestUser.blacklisted === true) {
            if(latestUser?.blacklisted){
                return res.status(401).json({
                    message: "BlackListed Account!"
                })
            }else{
                return res.status(401).json({
                    message: "Invalid User!"
                })
            }
            
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid User!",
        })
    }
}

const checkBlacklistedToken = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) return res.status(401).send('No token provided.');

    try {
        const isBlacklisted = await blackListTokenModel.findOne({ token });

        if (isBlacklisted) {
            res.clearCookie('token')
            return res.status(401).send('Token has been invalidated.');
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.clearCookie('token');
                    flag = 1;
                    return res.status(401).send('Token has expired.');
                }
                return res.status(401).send('Invalid token.');
            }
            next();
        });


    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(401).send('Invalid token.');
    }

};


const auth = async (req, res, next) => {

    checkBlacklistedToken(req, res, async () => {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Access Denied! Please Login"
            })
        }

        const userData = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const latestUser = await userModel.findById(userData._id);

        if (!latestUser || latestUser.isActive === false || latestUser.blacklisted === true) {
            res.clearCookie('token')
            return res.status(401).json({
                message: "Token verification failed"
            })
        }
        req.user = latestUser;
        next();

    })

}

const adminAuth = async (req, res, next) => {
    auth(req, res, () => {
        if (req.user.role === 'user') {
            return res.status(403).json({
                message: "You are not authorized to perform this operation."
            })
        }
        next();
    });
}

const superAdminAuth = async (req, res, next) => {
    auth(req, res, () => {
        if (req.user.role !== 'superAdmin') {
            return res.status(403).json({
                message: "You are not authorized to perform this operation."
            })
        }
        next();
    });
}

module.exports = {
    adminAuth,
    auth,
    isActive,
}