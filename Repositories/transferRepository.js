const {
    outcomes,
    transfers,
    incomes,
    users,
    reports,
    Sequelize
} = require("../models");
class transferRepository {
    static async handleCreateTransfer({
        userId,
        receiverId,
        amountTransfer,
        transferDate,
        descriptionTransfer
    }) {

        const createUserTransfer = transfers.create({
            userId,
            receiverId,
            amountTransfer,
            transferDate,
            descriptionTransfer
        });

        return createUserTransfer;
    };

    static async handleUpdateUserBalanceAfterTransfer({
        id,
        userId,
        balance,
        amountTransfer
    }) {

        const updateUserBalance = await users.update({
            balance: Sequelize.literal(`balance - ${amountTransfer}`)
        }, {
            where: {
                id: userId
            }
        });

        return updateUserBalance;

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

    static async handleUpdateReceiverBalanceAfterTransfer({
        id,
        receiverId,
        balance,
        amountTransfer
    }) {

        const totalBalance = await incomes.findAll({
            where: {
                userId: receiverId
            }
        });

        const totalAmountIncome = totalBalance.reduce((total, income) => {
            return total + income.amountIncome;
        }, 0);

        const updateReceiverBalance = await users.update({
            balance: totalAmountIncome
        }, {
            where: {
                id: receiverId
            }
        });

        return updateReceiverBalance;

    };

    static async createUserOutcomeAfterTransfer({
        userId,
        amountTransfer,
        transferDate,
        description
    }) {

        const createUserOutcome = await outcomes.create({
            userId,
            amountOutcome: amountTransfer,
            transactionDate: transferDate,
            description
        });

        return createUserOutcome;

    };

    static async createReceiverIncomeAfterTransfer({
        userId,
        amountTransfer,
        transferDate,
        description
    }) {

        const createReceiverIncome = await incomes.create({
            userId,
            amountIncome: amountTransfer,
            transactionDate: transferDate,
            description
        });

        return createReceiverIncome;

    };

    static async handleGetAllTransfer() {
        const query = {
            where: {},
            include: [{
                model: users,
                attributes: ["id", "userName", "email", "role"]
            }]
        }
        const getAllTransfer = await transfers.findAll(query);

        return getAllTransfer;
    };

    static async handleGetTransferById({
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

        const getTransferById = await transfers.findOne(query);

        return getTransferById;
    };

    static async handleCreateReportsTransfer({
        userId,
        transferId,
        reportDate
    }) {
        
        const createReportsAfterCreateOutcome = await reports.create({
            userId,
            transferId,
            reportDate
        });

        return createReportsAfterCreateOutcome;
    };
}

module.exports = transferRepository;