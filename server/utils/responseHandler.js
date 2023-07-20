'use strict';

let httpCodeMap = {
    '-7': 403,			//The request was valid, but the server is refusing action
    '-6': 409,          //Name already exists (Conflict)
    '-5': 503,          //database connection error(Service Unavailable)
    '-4': 400,          //incomplete arguments (Bad Request)
    '-3': 404,          //Not found
    '-2': 401,          //UnAuthorized Access Attempt
    '-1': 500,          //unexpected error or database error (Internal Server Error)
    '1': 200,          //Success or update
    '2': 201,           //Created
    '4': 204			//No Content
};

module.exports = {
    respondError: respondError,
    respondSuccess: respondSuccess
}

function respondError(error, code) {
    return {
        status: httpCodeMap[code] || 500,
        message: error
    }
}

function respondSuccess(dataa, successMsg, code) {
    return {
        status: httpCodeMap[code] || 200,
        data: dataa,
        message: successMsg
    }
}
