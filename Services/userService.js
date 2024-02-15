const userRepository = require("../Repositories/userRepository");

class userService {
    static async handleGetIncomeByUserId({
        id,
        description,
        amountIncome,
        transactionDate,
    }) {
        try {
            const getIncomeByUserId = await userRepository.handleGetIncomeByUserId({
                id,
                description,
                amountIncome,
                transactionDate,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Pemasukan berhasil didapatkan!",
                data: {
                    getIncomeByUserId: getIncomeByUserId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada!",
                data: {
                    getIncomeByUserId: null,
                },
            };
        }

    };

    static async handleGetOutcomeByUserId({
        id,
        description,
        amountOutcome,
        transactionDate,
    }) {
        try {
            const getOutcomeByUserId = await userRepository.handleGetOutcomeByUserId({
                id,
                description,
                amountOutcome,
                transactionDate,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Pengeluaran berhasil didapatkan!",
                data: {
                    getOutcomeByUserId: getOutcomeByUserId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada!",
                data: {
                    getOutcomeByUserId: null,
                },
            };
        }
    };

    static async handleGetPlanOutcomeByUserId({
        id,
        namePlan,
        amountPlan,
        datePlan,
        description
    }) {
        try {
            const getPlanOutcomeByUserId = await userRepository.handleGetPlanOutcomeByUserId({
                id,
                namePlan,
                amountPlan,
                datePlan,
                description
            });

            return {
                status: true,
                statusCode: 200,
                message: "Planning pengeluaran berhasil didapatkan!",
                data: {
                    getPlanOutcomeByUserId: getPlanOutcomeByUserId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada!",
                data: {
                    getPlanOutcomeByUserId: null,
                },
            };
        }
    };

    static async handleGetTransferByUserId({
        id,
        amountTransfer,
        receiverId,
        transferDate
    }) {
        try {
            const getTransferByUserId = await userRepository.handleGetTransferByUserId({
                id,
                amountTransfer,
                receiverId,
                transferDate
            });

            return {
                status: true,
                statusCode: 200,
                message: "Riwayat transfer anda berhasil didapatkan!",
                data: {
                    getTransferByUserId: getTransferByUserId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada!",
                data: {
                    getTransferByUserId: null,
                },
            };
        }
    };

    static async handleGetReportByUserId({
        id,
        reportDate
    }) {
        try {
            const getReportByUserId = await userRepository.handleGetReportByUserId({
                id,
                reportDate
            });

            return {
                status: true,
                statusCode: 200,
                message: "Riwayat laporan anda berhasil didapatkan!",
                data: {
                    getReportByUserId: getReportByUserId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada!",
                data: {
                    getReportByUserId: null,
                },
            };
        }
    };
};

module.exports = userService;