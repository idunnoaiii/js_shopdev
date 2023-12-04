'use strict'


const StatusCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    FORBIDDEN: 403,
    UNAUTHORISED: 401
}

const StatusCodeReason = {
    BAD_REQUEST: "Bad Request Error",
    NOT_FOUND: "Not Found Error",
    CONFLICT: "Conflict Error",
    FORBIDDEN: "Forbidden Error",
    UNAUTHORISED: "Unauthorised Error"
}


class ResponseError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class BadRequestError extends ResponseError {
    constructor(message = StatusCodeReason.BAD_REQUEST, status = StatusCode.BAD_REQUEST) {
        super(message, status)
    }
}

class NotFoundError extends ResponseError {
    constructor(message = StatusCodeReason.NOT_FOUND, status = StatusCode.NOT_FOUND) {
        super(message, status)
    }
}

class ConflictRequestError extends ResponseError {
    constructor(message = StatusCodeReason.CONFLICT, status = StatusCode.CONFLICT) {
        super(message, status)
    }
}
class ForbiddenError extends ResponseError {
    constructor(message = StatusCodeReason.FORBIDDEN, status = StatusCode.FORBIDDEN) {
        super(message, status)
    }
}
class UnauthorisedError extends ResponseError {
    constructor(message = StatusCodeReason.UNAUTHORISED, status = StatusCode.UNAUTHORISED) {
        super(message, status)
    }
}

module.exports = {
    ResponseError,
    BadRequestError,
    NotFoundError,
    ConflictRequestError,
    ForbiddenError,
    UnauthorisedError
}