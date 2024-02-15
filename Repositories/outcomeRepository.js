const {
    outcomes,
    incomes,
    reports,
    users
} = require("../models");

class outcomeRepository {
    static async handleCreateOutcome({
        userId,
        amountOutcome,
        description,
        transactionDate
    }) {
        const createOutcomeDatas = outcomes.create({
            userId,
            amountOutcome,
            description,
            transactionDate
        });

        const totalBalance = await incomes.findAll({
            where: {
                userId: userId
            }
        });

        const totalAmountIncome = totalBalance.reduce((total, income) => {
            return total + income.amountIncome;
        }, 0);

        const totalSaldo = await outcomes.findAll({
            where: {
                userId: userId
            }
        });

        const totalAmountOutcome = totalSaldo.reduce((total, income) => {
            return total + income.amountOutcome;
        }, 0);


        await users.update({
            balance: totalAmountIncome - totalAmountOutcome
        }, {
            where: {
                id: userId
            }
        })

        return createOutcomeDatas;
    };

    static async handleGetAllOutcome() {

        const query = {
            where: {},
            include: [{
                model: users,
                attributes: ["id", "userName", "email", "role"]
            }]
        }
        
        const getAllOutcome = await outcomes.findAll(query);

        return getAllOutcome;
    };

    static async handleGetOutcomeById({
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

        const getOutcomeById = await outcomes.findOne(query);

        return getOutcomeById;
    };

    static async handleUpdateOutcomeById({
        id,
        userId,
        amountOutcome,
        description,
    }) {
        const updateOutcomeById = await outcomes.update({
            userId,
            amountOutcome,
            description,
        }, {
            where: {
                id
            }
        });

        const totalBalance = await incomes.findAll({
            where: {
                userId: userId
            }
        });

        const totalAmountIncome = totalBalance.reduce((total, income) => {
            return total + income.amountIncome;
        }, 0);

        const totalSaldo = await outcomes.findAll({
            where: {
                userId: userId
            }
        });

        const totalAmountOutcome = totalSaldo.reduce((total, income) => {
            return total + income.amountOutcome;
        }, 0);


        await users.update({
            balance: totalAmountIncome - totalAmountOutcome
        }, {
            where: {
                id: userId
            }
        })

        return updateOutcomeById;
    };

    static async handleDeleteOutcomeById({
        id,
        userId,
        deletedAt
    }) {
        const deleteOutcomeById = await outcomes.update({
            userId,
            deletedAt
        }, {
            where: {
                id
            }
        });

        return deleteOutcomeById;
    };

    static async handleCreateReportsOutcome({
        userId,
        outcomeId,
        reportDate
    }) {

        const createReportsAfterCreateOutcome = await reports.create({
            userId,
            outcomeId,
            reportDate
        });

        return createReportsAfterCreateOutcome;
    };
};

module.exports = outcomeRepository;