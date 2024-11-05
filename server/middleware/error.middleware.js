

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Something Went Wrong"
    // //wrong Mongodb Id error
    // if(err.name === "CastError"){
    //     const message = `Resource not found. Invalid : ${err.path}`
    //     err  = new ApiError(message , 400)
    // }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}