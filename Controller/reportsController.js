const reportsService = require("../Services/reportsService");

const handleGetAllReports = async (req, res) => {

    const {
        status,
        statusCode,
        message,
        data
    } =
    await reportsService.handleGetAllReports();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetReportById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await reportsService.handleGetReportById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

module.exports = {
    handleGetAllReports,
    handleGetReportById,
}