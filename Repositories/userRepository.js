const {
    users,
    incomes,
    outcomes,
    planOutcomes,
    reports,
    transfers
} = require('../models')

class userRepository {
    static async handleGetUsersByEmail({
        email
    }) {
        const dataUsersByEmail = await users.findOne({
            where: {
                email: email
            }
        });

        return dataUsersByEmail;
    };

    static async handleRegister({
        userName,
        email,
        password,
        role,
        pin,
        isActivated
    }) {
        const dataRegistered = await users.create({
            userName,
            email,
            password,
            role,
            pin,
            isActivated
        }, {
            where: {
                email
            }
        })

        return dataRegistered;
    };

    static async handleGetUserIsActivated({
        isActivated,
        password
    }) {

        const getUserData = await users.findOne({
            where: {
                isActivated
            }
        });

        return getUserData;
    };

    static async handleUpdateIsActivated({
        isActivated
    }) {

        const updateUserPassword = await users.update({
            isActivated: 'berhasil',

        }, {
            where: {
                isActivated
            }
        });

        return updateUserPassword;
    };

    static async handleUpdateUserOTP({
        email,
        otp
    }) {

        const updatedOtp = await users.update({
            otp
        }, {
            where: {
                email
            }
        });

        return updatedOtp;
    };

    static async handleGetUserOTP({
        otp,
        password
    }) {

        const getUserData = await users.findOne({
            where: {
                otp
            }
        });

        return getUserData;
    };

    static async handleResetPassword({
        otp,
        password
    }) {

        const updateUserPassword = await users.update({
            otp: null,
            password

        }, {
            where: {
                otp
            }
        });

        return updateUserPassword;
    };

    static async handleGetIncomeByUserId({
        id,
        description,
        amountIncome,
        transactionDate,
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
                userId: id
            }
        }

        if (description) {
            query.where = {
                ...query.where,
                description
            }
        }

        if (amountIncome) {
            query.where = {
                ...query.where,
                amountIncome
            }
        }

        if (transactionDate) {
            query.where = {
                ...query.where,
                transactionDate
            }
        }

        const getIncomeByUserId = await incomes.findAll(query);

        return getIncomeByUserId;
    };

    static async handleGetOutcomeByUserId({
        id,
        description,
        amountOutcome,
        transactionDate
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
                userId: id
            }
        }

        if (description) {
            query.where = {
                ...query.where,
                description
            }
        }

        if (amountOutcome) {
            query.where = {
                ...query.where,
                amountOutcome
            }
        }

        if (transactionDate) {
            query.where = {
                ...query.where,
                transactionDate
            }
        }

        const getOutcomeByUserId = await outcomes.findAll(query);

        return getOutcomeByUserId;
    };

    static async handleGetPlanOutcomeByUserId({
        id,
        namePlan,
        amountPlan,
        datePlan,
        description
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
                userId: id
            }
        }

        if (namePlan) {
            query.where = {
                ...query.where,
                namePlan
            }
        }

        if (amountPlan) {
            query.where = {
                ...query.where,
                amountPlan
            }
        }

        if (datePlan) {
            query.where = {
                ...query.where,
                datePlan
            }
        }

        if (description) {
            query.where = {
                ...query.where,
                description
            }
        }

        const getPlanOutcomeByUserId = await planOutcomes.findAll(query);

        return getPlanOutcomeByUserId;
    };

    static async handleGetTransferByUserId({
        id,
        amountTransfer,
        receiverId
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
                userId: id
            }
        }

        if (amountTransfer) {
            query.where = {
                ...query.where,
                amountTransfer
            }
        }

        if (receiverId) {
            query.where = {
                ...query.where,
                receiverId
            }
        }

        if (transferDate) {
            query.where = {
                ...query.where,
                transferDate
            }
        }

        const getTransferByUserId = await transfers.findAll(query);

        return getTransferByUserId;
    };

    static async handleGetReportByUserId({
        id,
        reportDate
    }) {
        const query = {
            where: {},
            include: [{
                    model: users,
                    attributes: ["id", "userName", "email", "role"]
                },
                {
                    model: incomes,
                    attributes: ["id", "amountIncome", "description", "transactionDate"]
                },
                {
                    model: outcomes,
                    attributes: ["id", "amountOutcome", "description", "transactionDate"]
                },
                {
                    model: transfers,
                    attributes: ["id", "amountTransfer", "transferDate"]
                }
            ]
        }

        if (id) {
            query.where = {
                ...query.where,
                userId: id
            }
        }

        if (reportDate) {
            query.where = {
                ...query.where,
                reportDate
            }
        }

        const getReportByUserId = await reports.findAll(query);

        return getReportByUserId;
    };
}

module.exports = userRepository;