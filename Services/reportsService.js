const reportsRepository = require("../Repositories/reportsRepository");

class reportsService {
    static async handleGetAllReports() {
        try {
            const getAllReports =
                await reportsRepository.handleGetAllReports();

            return {
                status: true,
                statusCode: 200,
                message: "Laporan berhasil ditampilkan!",
                data: getAllReports,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getAllReports: null,
                },
            };
        }
    };

    static async handleGetReportById({
        id
    }) {
        try {
            const getReportById =
                await reportsRepository.handleGetReportById({
                    id
                });

            return {
                status: true,
                statusCode: 200,
                message: "Laporan berhasil ditampilkan!",
                data: getReportById,
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getReportById: null,
                },
            };
        }
    };
}

module.exports = reportsService;