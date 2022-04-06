const errorResponse = function (code,data) {
    return {
        statusCode: code,
        error: data
    }
}

module.exports = errorResponse;