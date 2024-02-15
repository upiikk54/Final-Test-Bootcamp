const authService = require("../Services/authService");
const {
    generatedOTP
} = require("../helper/otpGenerator");

const handleRegister = async (req, res) => {
    const {
        userName,
        email,
        password,
        role,
        pin,
    } = req.body

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleRegister({
        userName,
        email,
        password,
        role,
        pin,
        isActivated: generatedOTP()
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleUpdateIsActivated = async (req, res) => {

    const {
        isActivated
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleUpdateIsActivated({
        isActivated,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });

};

const handleLogin = async (req, res) => {
    const {
        email,
        password,
    } = req.body

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleLogin({
        email,
        password,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleForgotPassword = async (req, res) => {

    const {
        email
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleForgotPassword({
        email,
        otp: generatedOTP()
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });

};

const handleResetPassword = async (req, res) => {

    const { otp, password } = req.body;

    const {status, statusCode, message, data} = await authService.handleResetPassword({
        otp,
        password,
    });

    res.status(statusCode).send({
        status : status,
        message: message,
        data : data,
    });

};

module.exports = {
    handleRegister,
    handleUpdateIsActivated,
    handleLogin,
    handleForgotPassword,
    handleResetPassword
}