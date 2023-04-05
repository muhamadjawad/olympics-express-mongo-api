const CustomError = (msg = "something went wrong", statusCode = 400) => {
    let error = new Error(msg)
    error.statusCode = statusCode
    throw error
}


module.exports = { CustomError }