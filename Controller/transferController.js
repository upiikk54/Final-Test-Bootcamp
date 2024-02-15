const transferService = require('../Services/transferService');

const handleCreateTransfer = async (req, res) => {
    const {
        amountTransfer,
        receiverId,
        pin,
        descriptionTransfer
    } = req.body;

    const userId = req.user.id;
    const today = new Date();

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transferService.handleCreateTransfer({
        userId,
        amountTransfer,
        receiverId,
        transferDate: today,
        pin,
        descriptionTransfer
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetAllTransfer = async (req, res) => {

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transferService.handleGetAllTransfer();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetTransferById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transferService.handleGetTransferById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

module.exports = {
    handleCreateTransfer,
    handleGetAllTransfer,
    handleGetTransferById

}