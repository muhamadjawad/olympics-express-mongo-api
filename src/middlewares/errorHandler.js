const ErrorHandler = (err, req, res, next) => {

    console.log("Middleware Error Hadnling",err);
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        error: true,
        status: errStatus,
        message: errMsg,
        // stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

module.exports = {
    ErrorHandler
}