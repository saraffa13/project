const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

module.exports.sendConfirmationMail = async (confirmationToken, email) => {
    try {
        const confirmationLink = `http://localhost:5173/confirm-email/${confirmationToken}`;
        const mailOptions = {
            to: email,
            from: "no-reply@yourapp.com",
            subject: "Account Confirmation",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #4CAF50;">Welcome to YourApp!</h2>
                    <p style="font-size: 16px; color: #333;">Thank you for registering with us! Please confirm your email to complete your registration and activate your account.</p>
                    <p style="text-align: center; margin: 20px;">
                        <a href="${confirmationLink}" style="padding: 12px 20px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Confirm Your Email</a>
                    </p>
                    <p style="font-size: 14px; color: #666;">If you didn’t create this account, please disregard this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log('Something went wrong!', error);
        return error;
    }
};


module.exports.sendFinalMail = async (email) => {
    try {
        const mailOptions = {
            to: email,
            from: "no-reply@yourapp.com",
            subject: "Account Activated",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #4CAF50;">Account Activated</h2>
                    <p style="font-size: 16px; color: #333;">Your account has been successfully activated. Welcome to YourApp!</p>
                    <p style="font-size: 14px; color: #666;">Feel free to reach out to our support team if you have any questions.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log('Something went wrong!', error);
        return error;
    }
};

module.exports.sendForgotPasswordMail = async (confirmationToken, email) => {
    try {
        const confirmationLink = `http://localhost:5173/change-password/${confirmationToken}`;

        const mailOptions = {
            to: email,
            from: "no-reply@yourapp.com",
            subject: "Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #FF5722;">Password Reset</h2>
                    <p style="font-size: 16px; color: #333;">We received a request to reset your password. Click the button below to proceed.</p>
                    <p style="text-align: center; margin: 20px;">
                        <a href="${confirmationLink}" style="padding: 12px 20px; color: #ffffff; background-color: #FF5722; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    </p>
                    <p style="font-size: 14px; color: #666;">If you didn’t request a password reset, please ignore this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log('Something went wrong!', error);
        return error;
    }
};

module.exports.sendChangePasswordMail = async (email) => {
    try {
        const mailOptions = {
            to: email,
            from: "no-reply@yourapp.com",
            subject: "Password Changed Successfully",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #4CAF50;">Password Changed</h2>
                    <p style="font-size: 16px; color: #333;">Your password has been successfully changed. If you didn’t make this change, please contact our support team immediately.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log('Something went wrong!', error);
        return error;
    }
};

module.exports.sendGeneralMail = async (message, email, subject) => {
    try {
        const mailOptions = {
            to: email,
            from: "no-reply@yourapp.com",
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <div style="text-align: center; padding-bottom: 20px;">
                        <h2 style="color: #4CAF50; font-size: 24px;">${subject}</h2>
                    </div>
                    <div style="font-size: 16px; line-height: 1.6; color: #333;">
                        ${message}
                    </div>
                    <div style="padding-top: 20px; text-align: center;">
                        <p style="font-size: 12px; color: #999; margin-top: 20px;">
                            If you have any questions, feel free to <a href="mailto:support@yourapp.com" style="color: #4CAF50; text-decoration: none;">contact us</a>.
                        </p>
                    </div>
                    <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 20px; text-align: center;">
                        <p style="font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} YourApp. All rights reserved.</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Something went wrong!', error);
        return error;
    }
};
