const userService = require("../Services/userService");

const handleGetIncomeByUserId = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        description,
        amountIncome,
        transactionDate,
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await userService.handleGetIncomeByUserId({
        id,
        description,
        amountIncome,
        transactionDate,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetOutcomeByUserId = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        description,
        amountOutcome,
        transactionDate,
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await userService.handleGetOutcomeByUserId({
        id,
        description,
        amountOutcome,
        transactionDate,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetPlanOutcomeByUserId = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        namePlan,
        amountPlan,
        datePlan,
        description
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await userService.handleGetPlanOutcomeByUserId({
        id,
        namePlan,
        amountPlan,
        datePlan,
        description
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetTransferByUserId = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        amountTransfer,
        receiverId,
        transferDate
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await userService.handleGetTransferByUserId({
        id,
        amountTransfer,
        receiverId,
        transferDate
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetReportByUserId = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        reportDate
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await userService.handleGetReportByUserId({
        id,
        reportDate
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    handleGetIncomeByUserId,
    handleGetOutcomeByUserId,
    handleGetPlanOutcomeByUserId,
    handleGetTransferByUserId,
    handleGetReportByUserId
}