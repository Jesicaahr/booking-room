const errorHandler = (err, req, res, next) => {
    if(err.name == "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError") {
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(400).json({
            type: "Bad Request",
            errors
        })
    }
    else if(err.name == "SequelizeDatabaseError"){
        return res.status(400).json({
            type: "Bad Request",
            errors: err.parent.routine
        })
    }
    else if(err.name == "Bad Request"){
        return res.status(400).json({
            type: "Bad Request",
            errors: err.errors
        })
    }
    else if(err.name == "Unauthorized" || err.name == "JsonWebTokenError" ){
        return res.status(401).json({
            type: "Unauthorized",
            errors: err.errors
        })
    }
    else if(err.name == "Not Found"){
        return res.status(404).json({
            type: "Not Found",
            errors: err.errors
        })
    }
    else if(err.name == "Internal Server Error"){
        return res.status(500).json({
            type: "Internal Server Error",
            errors
        })
    }
    else {
        return res.status(500).json({
            errors: [{message: err}]
        })
    }
    
}

module.exports = errorHandler;