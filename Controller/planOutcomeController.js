const planOutcomeService = require("../Services/planOutcomeService");

const handleCreatePlanOutcome = async (req, res) => {
    const {
        namePlan,
        amountPlan,
        description,
        datePlan
    } = req.body;

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await planOutcomeService.handleCreatePlanOutcome({
        userId,
        namePlan,
        amountPlan,
        description,
        datePlan
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetAllPlanOutcome = async (req, res) => {

    const {
        status,
        statusCode,
        message,
        data
    } =
    await planOutcomeService.handleGetAllPlanOutcome();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetPlanOutcomeById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await planOutcomeService.handleGetPlanOutcomeById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleUpdatePlanOutcomeById = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        namePlan,
        amountPlan,
        description,
        datePlan
    } = req.body;

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await planOutcomeService.handleUpdatePlanOutcomeById({
        id,
        userId,
        namePlan,
        amountPlan,
        description,
        datePlan
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleDeletePlanOutcomeById = async (req, res, next) => {
    const {
        id
    } = req.params;

    const userId = req.user.id;
    const today = new Date();

    const {
        status,
        statusCode,
        message,
        data
    } = await planOutcomeService.handleDeletePlanOutcomeById({
        id,
        userId,
        deletedAt: today,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    handleCreatePlanOutcome,
    handleUpdatePlanOutcomeById,
    handleDeletePlanOutcomeById,
    handleGetAllPlanOutcome,
    handleGetPlanOutcomeById
}