'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
}


const ReasonStatusCode = {
    OK: "Success",
    CREATED: "Created",
    NO_CONTENT: "No content",
}

class SuccessResponse {
    constructor({ message, status = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }) {
        this.message = !message ? reasonStatusCode : message
        this.status = status
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res
            .status(this.status)
            .json(this)
    }
}


class Ok extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata })
    }
}

class Created extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, status: StatusCode.CREATED, reasonStatusCode: ReasonStatusCode.CREATED, metadata })
    }
}

class NoContent extends SuccessResponse {
    constructor({ message }) {
        super({ message, status: StatusCode.NO_CONTENT, reasonStatusCode: ReasonStatusCode.NO_CONTENT, metadata: {} })
    }
}


module.exports = {
    Ok,
    Created,
    NoContent,
    SuccessResponse
}
