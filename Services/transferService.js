const incomeRepository = require('../Repositories/incomeRepository');
const transferRepository = require('../Repositories/transferRepository');
const {
    users
} = require("../models");

class transferService {
    static async handleCreateTransfer({
        id,
        userId,
        amountTransfer,
        receiverId,
        transferDate,
        pin,
        balance,
        descriptionTransfer
    }) {
        try {

            if (!amountTransfer) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nominal transfer harus diisi!",
                    data: {
                        createIncome: null
                    }
                }
            }

            if (!receiverId) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "No tujuan harus diisi!",
                    data: {
                        createIncome: null
                    }
                }
            };

            if (!descriptionTransfer) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Keterangan transfer harus diisi!",
                    data: {
                        createIncome: null
                    }
                }
            };

            const getUser = await transferRepository.handleGetUserById({
                id,
                userId
            });

            if (getUser.pin == pin && getUser.isActivated == 'berhasil') {

                const transferDatas = await transferRepository.handleCreateTransfer({
                    userId,
                    receiverId,
                    amountTransfer,
                    transferDate,
                    descriptionTransfer
                });

                const updateUserBalanceAfterTranster = await transferRepository.handleUpdateUserBalanceAfterTransfer({
                    id,
                    userId,
                    balance,
                    amountTransfer
                });
                const updateReceiverBalanceAfterTranster = await transferRepository.handleUpdateReceiverBalanceAfterTransfer({
                    id,
                    receiverId,
                    balance,
                    amountTransfer
                });
                const createUserOutcomeAfterTransfer = await transferRepository.createUserOutcomeAfterTransfer({
                    userId: getUser.id,
                    amountTransfer,
                    transferDate,
                    description: transferDatas.descriptionTransfer
                });
                const createReceiverIncomeAfterTransfer = await transferRepository.createReceiverIncomeAfterTransfer({
                    userId: receiverId,
                    amountTransfer,
                    transferDate,
                    description: transferDatas.descriptionTransfer
                });
                const today = new Date();

                const createReportsAfterCreateTransfer = await transferRepository.handleCreateReportsTransfer({
                    userId,
                    transferId: transferDatas.id,
                    reportDate: today
                });

                return {
                    status: true,
                    statusCode: 201,
                    message: "Anda berhasil transfer!",
                    data: {
                        createTransfer: transferDatas,
                        updateUserBalance: updateUserBalanceAfterTranster,
                        updateReceiverBalance: updateReceiverBalanceAfterTranster,
                        createUserOutcome: createUserOutcomeAfterTransfer,
                        createReceiverIncome: createReceiverIncomeAfterTransfer,
                        createReportTransfer: createReportsAfterCreateTransfer
                    }
                };
            } else {
                return {
                    status: false,
                    statusCode: 400,
                    message: "PIN anda salah!",
                    data: {
                        createTransfer: null
                    }
                };
            }
        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    createTransfer: null
                }
            };
        };
    };

    static async handleGetAllTransfer() {
        try {
            const getAllTransfer = await transferRepository.handleGetAllTransfer();

            return {
                status: true,
                statusCode: 200,
                message: "Transfer berhasil ditampilkan!",
                data: getAllTransfer,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getAllTransfer: null,
                },
            };
        }
    };

    static async handleGetTransferById({
        id
    }) {
        try {
            const getTransferById = await transferRepository.handleGetTransferById({
                id
            });

            return {
                status: true,
                statusCode: 200,
                message: "Riwayat transfer berhasil ditampilkan!",
                data: getTransferById,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getTransferById: null,
                },
            };
        }
    };
}

module.exports = transferService