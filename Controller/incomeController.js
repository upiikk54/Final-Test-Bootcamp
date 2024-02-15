const incomeService = require("../Services/incomeService");

const handleCreateIncome = async (req, res) => {
    const {
        amountIncome,
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
    await incomeService.handleCreateIncome({
        userId,
        amountIncome,
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

const handleDeleteIncomeById = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        pin
    } = req.body;

    const userId = req.user.id;
    const today = new Date();

    const {
        status,
        statusCode,
        message,
        data
    } = await incomeService.handleDeleteIncomeById({
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

const handleUpdateIncomeById = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        amountIncome,
        description,
        pin
    } = req.body;

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await incomeService.handleUpdateIncomeById({
        id,
        userId,
        amountIncome,
        description,
        pin
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetAllIncome = async (req, res) => {

    const {
        status,
        statusCode,
        message,
        data
    } =
    await incomeService.handleGetAllIncome();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetIncomeById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await incomeService.handleGetIncomeById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

module.exports = {
    handleCreateIncome,
    handleUpdateIncomeById,
    handleDeleteIncomeById,
    handleGetAllIncome,
    handleGetIncomeById
}