const outcomeService = require("../Services/outcomeService");

const handleCreateOutcome = async (req, res) => {
    const {
        amountOutcome,
        description,
        pin
    } = req.body;

    const userId = req.user.id;
    const today = new Date();

    const {
        status,
        statusCode,
        message,
        data
    } =
    await outcomeService.handleCreateOutcome({
        userId,
        amountOutcome,
        transactionDate: today,
        description,
        pin
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetAllOutcome = async (req, res) => {

    const {
        status,
        statusCode,
        message,
        data
    } =
    await outcomeService.handleGetAllOutcome();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetOutcomeById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await outcomeService.handleGetOutcomeById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleUpdateOutcomeById = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        amountOutcome,
        description,
        pin
    } = req.body;

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await outcomeService.handleUpdateOutcomeById({
        id,
        userId,
        amountOutcome,
        description,
        pin
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleDeleteOutcomeById = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        pin
    } = req.body

    const userId = req.user.id;
    const today = new Date();

    const {
        status,
        statusCode,
        message,
        data
    } = await outcomeService.handleDeleteOutcomeById({
        id,
        userId,
        deletedAt: today,
        pin
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    handleCreateOutcome,
    handleGetAllOutcome,
    handleGetOutcomeById,
    handleUpdateOutcomeById,
    handleDeleteOutcomeById
};