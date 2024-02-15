const {
    planOutcomes,
    users
} = require("../models");


class planOutcomeRepository {
    static async handleCreatePlanOutcome({
        userId,
        namePlan,
        amountPlan,
        description,
        datePlan
    }) {
        const createPlanOutcome = planOutcomes.create({
            userId,
            namePlan,
            amountPlan,
            description,
            datePlan
        });

        return createPlanOutcome;
    };

    static async handleGetAllPlanOutcome() {
        const query = {
            where: {},
            include: [{
                model: users,
                attributes: ["id", "userName", "email", "role"]
            }]
        }
        const getAllPlanOutcome = await planOutcomes.findAll(query);

        return getAllPlanOutcome;
    };

    static async handleGetPlanOutcomeById({
        id
    }) {
        const query = {
            where: {},
            include: [{
                model: users,
                attributes: ["id", "userName", "email", "role"]
            }]
        }
        if (id) {
            query.where = {
                ...query.where,
                id: id
            }
        }

        const getPlanOutcomeById = await planOutcomes.findOne(query);

        return getPlanOutcomeById;
    };

    static async handleUpdatePlanOutcomeById({
        id,
        userId,
        namePlan,
        amountPlan,
        description,
        datePlan
    }) {
        const updatePlanOutcomeById = await planOutcomes.update({
            userId,
            namePlan,
            amountPlan,
            description,
            datePlan
        }, {
            where: {
                id
            }
        });

        return updatePlanOutcomeById;
    };

    static async handleDeletePlanOutcomeById({
        id,
        userId,
        deletedAt
    }) {
        const deleteIncomeById = await planOutcomes.update({
            userId,
            deletedAt
        }, {
            where: {
                id
            }
        });

        return deleteIncomeById;
    };
};

module.exports = planOutcomeRepository;