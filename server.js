const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const rateLimitMiddleware = require("./Middlewares/rateLimiter");

app.use(express.json());
app.use(
    bodyParse.urlencoded({
        extended: false,
    })
);
app.use(rateLimitMiddleware);
app.use(cors());
app.use(helmet());

const authController = require('./Controller/authController');
const incomeController = require('./Controller/incomeController');
const outcomeController = require('./Controller/outcomeController');
const userController = require('./Controller/userController');
const planOutcomeController = require('./Controller/planOutcomeController');
const transferController = require('./Controller/transferController');
const reportController = require('./Controller/reportsController')
const authMiddlewares = require('./Middlewares/auth');



// API Authorization
app.post("/api/v1/register", authController.handleRegister);
app.put("/api/v1/isActivated", authController.handleUpdateIsActivated);
app.post("/api/v1/login", authController.handleLogin);
app.put("/api/v1/forgotPassword", authController.handleForgotPassword);
app.put("/api/v1/resetPassword", authController.handleResetPassword);

// API Pemasukan
app.post("/api/v1/createIncome", authMiddlewares.authenticate, incomeController.handleCreateIncome);
app.get("/api/v1/getIncome", incomeController.handleGetAllIncome);
app.get("/api/v1/getIncome/:id", authMiddlewares.authenticate, incomeController.handleGetIncomeById);
app.get("/users/:id/getIncome", authMiddlewares.authenticate, userController.handleGetIncomeByUserId);
app.put("/api/v1/updateIncome/:id", authMiddlewares.authenticate, incomeController.handleUpdateIncomeById);
app.put("/api/v1/deleteIncome/:id", authMiddlewares.authenticate, incomeController.handleDeleteIncomeById);

// API Pengeluaran
app.post("/api/v1/createOutcome", authMiddlewares.authenticate, outcomeController.handleCreateOutcome);
app.get("/api/v1/getOutcome", outcomeController.handleGetAllOutcome);
app.get("/users/:id/getOutcome", authMiddlewares.authenticate, userController.handleGetOutcomeByUserId);
app.get("/api/v1/getOutcome/:id", authMiddlewares.authenticate, outcomeController.handleGetOutcomeById);
app.put("/api/v1/updateOutcome/:id", authMiddlewares.authenticate, outcomeController.handleUpdateOutcomeById);
app.put("/api/v1/deleteOutcome/:id", authMiddlewares.authenticate, outcomeController.handleDeleteOutcomeById);

// API Planning Pengeluaran
app.post("/api/v1/createPlanOutcome", authMiddlewares.authenticate, planOutcomeController.handleCreatePlanOutcome);
app.get("/api/v1/getPlanOutcome", planOutcomeController.handleGetAllPlanOutcome);
app.get("/users/:id/getPlanOutcome", authMiddlewares.authenticate, userController.handleGetPlanOutcomeByUserId);
app.get("/api/v1/getPlanOutcome/:id", authMiddlewares.authenticate, planOutcomeController.handleGetPlanOutcomeById);
app.put("/api/v1/updatePlanOutcome/:id", authMiddlewares.authenticate, planOutcomeController.handleUpdatePlanOutcomeById);
app.put("/api/v1/deletePlanOutcome/:id", authMiddlewares.authenticate, planOutcomeController.handleDeletePlanOutcomeById);

//API transfer
app.post("/api/v1/createTransfer", authMiddlewares.authenticate, transferController.handleCreateTransfer);
app.get("/api/v1/getTransfer", transferController.handleGetAllTransfer);
app.get("/users/:id/getTransfer", authMiddlewares.authenticate, userController.handleGetTransferByUserId);
app.get("/api/v1/getTransfer/:id", authMiddlewares.authenticate, transferController.handleGetTransferById);


// API Get Laporan
app.get("/api/v1/getReport", reportController.handleGetAllReports);
app.get("/api/v1/getReport/:id", authMiddlewares.authenticate, reportController.handleGetReportById);
app.get("/users/:id/getReport", authMiddlewares.authenticate, userController.handleGetReportByUserId);


app.listen(8900, () => {
    console.log(
        `server berhasil berjalan di port http://localhost:8900`
    );
});

module.exports = app;