const {
    reports,
    users,
    incomes,
    outcomes,
    transfers
} = require("../models");

class reportsRepository {
    static async handleGetAllReports() {
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

        const getAllReports = await reports.findAll(query);

        return getAllReports;
    };

    static async handleGetReportById({
        id
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
                id: id
            }
        }

        const getReportById = await reports.findOne(query);

        return getReportById;
    };

}

module.exports = reportsRepository;