'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Base class for all HTTP errors
 */
class HttpError extends Error {
    constructor(name, message) {
        super(message);
        this.message = message;
        this.name = name;
    }
}
exports.HttpError = HttpError;
/**
 * Represents a BAD REQUEST error. The request could not be understood by the
 * server due to malformed syntax. The client SHOULD NOT repeat the request
 * without modifications.
 */
class BadRequestError extends HttpError {
    constructor(message) {
        super('BadRequestError', message || 'Bad Request');
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.statusCode = 400;
    }
}
exports.BadRequestError = BadRequestError;
/**
 * Represents an UNAUTHORIZED error. The request requires user authentication. The response
 * MUST include a WWW-Authenticate header field containing a challenge applicable to the
 * requested resource.
 */
class UnauthorizedError extends HttpError {
    constructor(message) {
        super('UnauthorizedError', message || 'Unauthorized');
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
        this.statusCode = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Represents a FORBIDDEN error. The server understood the request, but is refusing to
 * fulfill it. Authorization will not help and the request SHOULD NOT be repeated.
 */
class ForbiddenError extends HttpError {
    constructor(message) {
        super('ForbiddenError', message || 'Forbidden');
        Object.setPrototypeOf(this, ForbiddenError.prototype);
        this.statusCode = 403;
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Represents a NOT FOUND error. The server has not found anything matching
 * the Request-URI. No indication is given of whether the condition is temporary
 * or permanent. The 410 (GoneError) status code SHOULD be used if the server knows,
 * through some internally configurable mechanism, that an old resource is permanently
 * unavailable and has no forwarding address.
 *
 * This error is commonly used when
 * the server does not wish to reveal exactly why the request has been refused,
 * or when no other response is applicable.
 */
class NotFoundError extends HttpError {
    constructor(message) {
        super('NotFoundError', message || 'Not Found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Represents a METHOD NOT ALLOWED error. The method specified in the Request-Line is not allowed for
 * the resource identified by the Request-URI. The response MUST include an Allow header
 * containing a list of valid methods for the requested resource.
 */
class MethodNotAllowedError extends HttpError {
    constructor(message) {
        super('MethodNotAllowedError', message || 'Method Not Allowed');
        Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
        this.statusCode = 405;
    }
}
exports.MethodNotAllowedError = MethodNotAllowedError;
/**
 * Represents a NOT ACCEPTABLE error. The resource identified by the request is only capable of
 * generating response entities which have content characteristics not acceptable according
 * to the accept headers sent in the request.
 */
class NotAcceptableError extends HttpError {
    constructor(message) {
        super('NotAcceptableError', message || 'Not Acceptable');
        Object.setPrototypeOf(this, NotAcceptableError.prototype);
        this.statusCode = 406;
    }
}
exports.NotAcceptableError = NotAcceptableError;
/**
 * Represents a CONFLICT error. The request could not be completed due to a
 * conflict with the current state of the resource.
 */
class ConflictError extends HttpError {
    constructor(message) {
        super('ConflictError', message || 'Conflict');
        Object.setPrototypeOf(this, ConflictError.prototype);
        this.statusCode = 409;
    }
}
exports.ConflictError = ConflictError;
/**
 * Represents a GONE error. The requested resource is no longer available at the server
 * and no forwarding address is known. This condition is expected to be considered
 * permanent. Clients with link editing capabilities SHOULD delete references to
 * the Request-URI after user approval. If the server does not know, or has
 * no facility to determine, whether or not the condition is permanent, the
 * error 404 (NotFoundError) SHOULD be used instead. This response is
 * cacheable unless indicated otherwise.
 */
class GoneError extends HttpError {
    constructor(message) {
        super('GoneError', message || 'Gone');
        Object.setPrototypeOf(this, GoneError.prototype);
        this.statusCode = 410;
    }
}
exports.GoneError = GoneError;
/**
 * Represents an UNSUPPORTED MEDIA TYPE error. The server is refusing to service the request
 * because the entity of the request is in a format not supported by the requested resource
 * for the requested method.
 */
class UnsupportedMediaTypeError extends HttpError {
    constructor(message) {
        super('UnsupportedMediaTypeError', message || 'Unsupported Media Type');
        Object.setPrototypeOf(this, UnsupportedMediaTypeError.prototype);
        this.statusCode = 415;
    }
}
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;
/**
 * Represents a UNPROCESSABLE ENTITY error. The server understands the content type of the request entity
 * (hence a 415 Unsupported Media Type status code is inappropriate), and the syntax of the request entity is correct
 * (thus a 400 Bad Request status code is inappropriate) but was unable to process the contained instructions.
 */
class UnprocessableEntityError extends HttpError {
    constructor(message) {
        super('UnprocessableEntityError', message || 'Unprocessable Entity');
        Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
        this.statusCode = 422;
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
/**
 * Represents an INTERNAL SERVER error. The server encountered an unexpected condition
 * which prevented it from fulfilling the request.
 */
class InternalServerError extends HttpError {
    constructor(message) {
        super('InternalServerError', message || 'Internal Server Error');
        Object.setPrototypeOf(this, InternalServerError.prototype);
        this.statusCode = 500;
    }
}
exports.InternalServerError = InternalServerError;
/**
 * Represents a NOT IMPLEMENTED error. The server does not support the functionality required
 *  to fulfill the request. This is the appropriate response when the server does not recognize
 * the request method and is not capable of supporting it for any resource.
 */
class NotImplementedError extends HttpError {
    constructor(message) {
        super('NotImplementedError', message || 'Not Implemented');
        Object.setPrototypeOf(this, NotImplementedError.prototype);
        this.statusCode = 501;
    }
}
exports.NotImplementedError = NotImplementedError;
//# sourceMappingURL=errors.js.map