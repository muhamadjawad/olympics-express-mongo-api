const { validationResult } = require("express-validator");
const { CustomError } = require("../utils/customError");

const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        CustomError(errors.array()[0].msg, 401)
        // return res.status(400).json({
        //     "error": true,
        //     "message": errors.array()[0].msg
        // })
    }
    next()
}

module.exports = {
    isRequestValidated
}