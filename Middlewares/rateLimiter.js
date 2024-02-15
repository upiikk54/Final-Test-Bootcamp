const setRateLimit = require("express-rate-limit");

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: 1000,
    message: "Anda telah mencapai batas request!",
    headers: true,
});

module.exports = rateLimitMiddleware;