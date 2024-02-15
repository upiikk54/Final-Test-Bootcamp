const incomeRepository = require("../Repositories/incomeRepository");
const userRepository = require("../Repositories/userRepository");
const {
    users
} = require("../models");
class incomeService {
    static async handleCreateIncome({
        userId,
        amountIncome,
        description,
        transactionDate,
        pin
    }) {
        try {

            if (!amountIncome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nominal pemasukan harus diisi!",
                    data: {
                        createIncome: null
                    }
                }
            }

            if (!description) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Description harus diisi!",
                    data: {
                        createIncome: null
                    }
                }
            };

            const datasUser = await users.findOne({
                where: {
                    id: userId
                }
            });

            const balance = datasUser.balance + amountIncome

            if (datasUser.pin == pin  && datasUser.isActivated == 'berhasil') {
                const incomeDatas = await incomeRepository.handleCreateIncome({
                    userId,
                    amountIncome,
                    description,
                    balance,
                    transactionDate
                });

                const today = new Date();

                const createReportsAfterCreateIncome = await incomeRepository.handleCreateReportsIncome({
                    userId,
                    incomeId: incomeDatas.id,
                    reportDate: today
                })

                return {
                    status: true,
                    statusCode: 201,
                    message: "Pemasukan berhasil dibuat!",
                    data: {
                        createIncome: incomeDatas,
                        createReportsIncome: createReportsAfterCreateIncome
                    }
                };
            } else {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Tolong cek PIN dan aktivasi akun anda!",
                    data: {
                        createIncome: null
                    }
                };
            }
        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    createIncome: null
                }
            };
        };
    };

    static async handleGetAllIncome() {
        try {
            const getAllIncome =
                await incomeRepository.handleGetAllIncome();

            return {
                status: true,
                statusCode: 200,
                message: "Pemasukan berhasil ditampilkan!",
                data: getAllIncome,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getAllIncome: null,
                },
            };
        }
    };

    static async handleUpdateIncomeById({
        id,
        userId,
        amountIncome,
        description,
        pin
    }) {
        try {

            const getIncomeById = await incomeRepository.handleGetIncomeById({
                id
            })

            const datasUser = await users.findOne({
                where: {
                    id: userId
                }
            });

            if (getIncomeById.userId == userId && datasUser.pin == pin && datasUser.isActivated == 'berhasil') {

                if (!amountIncome) {
                    amountIncome = getIncomeById.amountIncome
                };
                if (!description) {
                    description = getIncomeById.description
                };


                const updateIncomeById = await incomeRepository.handleUpdateIncomeById({
                    id,
                    userId,
                    amountIncome,
                    description,
                });
                return {
                    status: true,
                    statusCode: 200,
                    message: "Pemasukan berhasil diperbarui",
                    data: {
                        updateIncomeById: updateIncomeById,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "Tolong cek PIN dan aktivasi akun anda!",
                    data: {
                        updateIncomeById: null,
                    },
                };
            };

        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    updateIncomeById: null
                }
            };
        };
    };

    static async handleDeleteIncomeById({
        id,
        userId,
        deletedAt,
        pin
    }) {
        try {

            const datasUser = await users.findOne({
                where: {
                    id: userId
                }
            });

            const getIncomeById = await incomeRepository.handleGetIncomeById({
                id
            })

            if (getIncomeById.userId == userId && datasUser.pin == pin && datasUser.isActivated == 'berhasil') {

                const deleteIncomeById = await incomeRepository.handleDeleteIncomeById({
                    id,
                    userId,
                    deletedAt
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Pemasukan berhasil dihapus!",
                    data: {
                        deleteIncomeById: deleteIncomeById,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "Tolong cek PIN dan aktivasi akun anda!",
                    data: {
                        deleteIncomeById: null,
                    },
                };
            };

        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    deleteIncomeById: null
                }
            };
        };
    };

    static async handleGetIncomeById({
        id
    }) {
        try {
            const getIncomeById = await incomeRepository.handleGetIncomeById({
                id
            });

            return {
                status: true,
                statusCode: 200,
                message: "Pemasukan berhasil ditampilkan!",
                data: getIncomeById,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getIncomeById: null,
                },
            };
        }
    };
};

module.exports = incomeService;