const planOutcomeRepository = require("../Repositories/planOutcomeRepository");

class planOutcomeService {
    static async handleCreatePlanOutcome({
        userId,
        namePlan,
        amountPlan,
        description,
        datePlan
    }) {
        try {

            if (!namePlan) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nama planning pengeluaran harus diisi!",
                    data: {
                        createPlanOutcome: null
                    }
                }
            }

            if (!amountPlan) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nominal planning pengeluaran harus diisi!",
                    data: {
                        createPlanOutcome: null
                    }
                }
            };

            if (!description) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Description planning pengeluaran harus diisi!",
                    data: {
                        createPlanOutcome: null
                    }
                }
            };

            if (!datePlan) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Tanggal planning pengeluaran harus diisi!",
                    data: {
                        createPlanOutcome: null
                    }
                }
            };

            const planOutcomesDatas = await planOutcomeRepository.handleCreatePlanOutcome({
                userId,
                namePlan,
                amountPlan,
                description,
                datePlan
            });

            return {
                status: true,
                statusCode: 201,
                message: "Planning pengeluaran berhasil dibuat!",
                data: {
                    createPlanOutcome: planOutcomesDatas
                }
            };
        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    createPlanOutcome: null
                }
            };
        };
    };

    static async handleGetAllPlanOutcome() {
        try {
            const getAllPlanOutcome = await planOutcomeRepository.handleGetAllPlanOutcome();

            return {
                status: true,
                statusCode: 200,
                message: "Planning Pengeluaran berhasil ditampilkan!",
                data: getAllPlanOutcome,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getAllPlanOutcome: null,
                },
            };
        }
    };

    static async handleGetPlanOutcomeById({
        id
    }) {
        try {
            const getPlanOutcomeById = await planOutcomeRepository.handleGetPlanOutcomeById({
                id
            });

            return {
                status: true,
                statusCode: 200,
                message: "Planning pengeluaran berhasil ditampilkan!",
                data: getPlanOutcomeById,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getPlanOutcomeById: null,
                },
            };
        }
    };

    static async handleUpdatePlanOutcomeById({
        id,
        userId,
        namePlan,
        amountPlan,
        description,
        datePlan
    }) {
        try {

            const getPlanOutcomeById = await planOutcomeRepository.handleGetPlanOutcomeById({
                id
            })

            if (getPlanOutcomeById.userId == userId) {

                if (!namePlan) {
                    namePlan = getPlanOutcomeById.namePlan
                };

                if (!amountPlan) {
                    amountPlan = getPlanOutcomeById.amountPlan
                };

                if (!description) {
                    description = getPlanOutcomeById.description
                };

                if (!datePlan) {
                    datePlan = getPlanOutcomeById.datePlan
                };

                const updatedPlanOutcomeById = await planOutcomeRepository.handleUpdatePlanOutcomeById({
                    id,
                    userId,
                    namePlan,
                    amountPlan,
                    description,
                    datePlan
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Planning pengeluaran berhasil diperbarui",
                    data: {
                        updatedPlanOutcomeById: updatedPlanOutcomeById,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "Sumber tidak ada.",
                    data: {
                        updatedPlanOutcomeById: null,
                    },
                };
            };

        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    updatedPlanOutcomeById: null
                }
            };
        };
    };

    static async handleDeletePlanOutcomeById({
        id,
        userId,
        deletedAt
    }) {
        try {

            const getPlanOutcomeById = await planOutcomeRepository.handleGetPlanOutcomeById({
                id
            })

            if (getPlanOutcomeById.userId == userId) {

                const deletedPlanOutcomeById = await planOutcomeRepository.handleDeletePlanOutcomeById({
                    id,
                    userId,
                    deletedAt
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Planning pengeluaran berhasil dihapus!",
                    data: {
                        deletedPlanOutcomeById: deletedPlanOutcomeById,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "Sumber tidak ada.",
                    data: {
                        deletedPlanOutcomeById: null,
                    },
                };
            };

        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    deletedPlanOutcomeById: null
                }
            };
        };
    };

};

module.exports = planOutcomeService;