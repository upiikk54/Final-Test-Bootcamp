const outcomeRepository = require("../Repositories/outcomeRepository");
const {
    users
} = require("../models");
class outcomeService {
    static async handleCreateOutcome({
        userId,
        amountOutcome,
        description,
        transactionDate,
        pin
    }) {
        try {

            if (!amountOutcome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nominal pengeluaran harus diisi!",
                    data: {
                        createOutcome: null
                    }
                }
            }

            if (!description) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Description harus diisi!",
                    data: {
                        createOutcome: null
                    }
                }
            };

            const datasUser = await users.findOne({
                where: {
                    id: userId
                }
            });

            if (datasUser.pin == pin && datasUser.isActivated == 'berhasil') {
                const outcomeDatas = await outcomeRepository.handleCreateOutcome({
                    userId,
                    amountOutcome,
                    description,
                    transactionDate
                });

                const today = new Date();

                const createReportsAfterCreateOutcome = await outcomeRepository.handleCreateReportsOutcome({
                    userId,
                    outcomeId: outcomeDatas.id,
                    reportDate: today
                })

                return {
                    status: true,
                    statusCode: 201,
                    message: "Pengeluaran berhasil dibuat!",
                    data: {
                        createOutcome: outcomeDatas,
                        createReportOutcome: createReportsAfterCreateOutcome
                    }
                };
            } else {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Tolong cek PIN dan aktivasi akun anda!",
                    data: {
                        createOutcome: null
                    }
                };
            }
        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    createOutcome: null
                }
            };
        };
    };

    static async handleGetAllOutcome() {
        try {
            const getAllOutcome = await outcomeRepository.handleGetAllOutcome();

            return {
                status: true,
                statusCode: 200,
                message: "Pengeluaran berhasil ditampilkan!",
                data: getAllOutcome,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getAllOutcome: null,
                },
            };
        }
    };

    static async handleGetOutcomeById({
        id
    }) {
        try {
            const getOutcomeById = await outcomeRepository.handleGetOutcomeById({
                id
            });

            return {
                status: true,
                statusCode: 200,
                message: "Pengeluaran berhasil ditampilkan!",
                data: getOutcomeById,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getOutcomeById: null,
                },
            };
        }
    };

    static async handleUpdateOutcomeById({
        id,
        userId,
        amountOutcome,
        description,
        pin
    }) {
        try {

            const getOutcomeById = await outcomeRepository.handleGetOutcomeById({
                id
            })

            const datasUser = await users.findOne({
                where: {
                    id: userId
                }
            });

            if (getOutcomeById.userId == userId && datasUser.pin == pin && datasUser.isActivated == 'berhasil') {

                if (!amountOutcome) {
                    amountOutcome = getOutcomeById.amountOutcome
                };

                if (!description) {
                    description = getOutcomeById.description
                };

                const updateOutcomeById = await outcomeRepository.handleUpdateOutcomeById({
                    id,
                    userId,
                    amountOutcome,
                    description,
                });



                return {
                    status: true,
                    statusCode: 200,
                    message: "Pengeluaran berhasil diperbarui",
                    data: {
                        updateOutcomeById: updateOutcomeById
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "Tolong cek PIN dan aktivasi akun anda!",
                    data: {
                        updateOutcomeById: null,
                    },
                };
            };

        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    updateOutcomeById: null
                }
            };
        };
    };

    static async handleDeleteOutcomeById({
        id,
        userId,
        deletedAt,
        pin
    }) {
        try {

            const getOutcomeById = await outcomeRepository.handleGetOutcomeById({
                id
            })

            const datasUser = await users.findOne({
                where: {
                    id: userId
                }
            });

            if (getOutcomeById.userId == userId && datasUser.pin == pin && datasUser.isActivated == 'berhasil') {

                const deleteOutcomeById = await outcomeRepository.handleDeleteOutcomeById({
                    id,
                    userId,
                    deletedAt
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Pengeluaran berhasil dihapus!",
                    data: {
                        deleteOutcomeById: deleteOutcomeById,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "Tolong cek PIN dan aktivasi akun anda!",
                    data: {
                        deleteOutcomeById: null,
                    },
                };
            };

        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    deleteOutcomeById: null
                }
            };
        };
    };
};

module.exports = outcomeService;