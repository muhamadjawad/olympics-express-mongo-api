const { check } = require("express-validator");


const CountryOptions = ['asia', 'pak', 'india']

const validateCreateEventsRequest = [
    check("name")
        .notEmpty().withMessage("Name is required"),
    // check("edition").isNumeric().withMessage(`Edition must be numeric`),
    // check("date").isDate().withMessage("Date error"),
    check("winner")
        .isString().withMessage("Winner must be string"),
    check("country")
        .custom((country) => {
            return CountryOptions.includes(country)
        })
        .withMessage(`Country must be 'pak' ,'india' or 'asia'`)

];

module.exports = {
    validateCreateEventsRequest
}