const successResponse = function(code,data) {
    return {
        statusCode: code,
        data: data
    }
}

module.exports = successResponse;