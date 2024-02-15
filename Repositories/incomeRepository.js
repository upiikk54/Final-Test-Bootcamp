const {
    incomes,
    users,
    reports
} = require("../models");


class incomeRepository {
    static async handleCreateIncome({
        userId,
        amountIncome,
        description,
        balance,
        transactionDate
    }) {
        const createIncomeDatas = await incomes.create({
            userId,
            amountIncome,
            description,
            transactionDate
        });

        await users.update({
            balance
        }, {
            where: {
                id: userId
            }
        });

        return createIncomeDatas;
    };

    static async handleGetAllIncome() {

        const query = {
            where: {},
            include: [{
                model: users,
                attributes: ["id", "userName", "email", "role"]
            }]
        }

        const getAllIncome = await incomes.findAll(query);

        return getAllIncome;
    };

    static async handleGetIncomeById({
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

        const getIncomeById = await incomes.findOne(query);

        return getIncomeById;
    };

    static async handleUpdateIncomeById({
        id,
        userId,
        amountIncome,
        description,
    }) {
        const updateIncomeById = await incomes.update({
            userId,
            amountIncome,
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


        await users.update({
            balance: totalAmountIncome
        }, {
            where: {
                id: userId
            }
        })

        return updateIncomeById;
    };

    static async handleDeleteIncomeById({
        id,
        userId,
        deletedAt
    }) {
        const deleteIncomeById = await incomes.update({
            userId,
            deletedAt
        }, {
            where: {
                id
            }
        });

        return deleteIncomeById;
    };

    static async handleGetUserById({
        id,
        userId
    }) {

        const getUser = await users.findOne({
            where: {
                id: userId
            }
        });

        return getUser;
    };

    static async handleCreateReportsIncome({
        userId,
        incomeId,
        reportDate
    }) {
        
        const createReportsAfterCreateIncome = await reports.create({
            userId,
            incomeId,
            reportDate
        });

        return createReportsAfterCreateIncome;
    };
};

module.exports = incomeRepository;