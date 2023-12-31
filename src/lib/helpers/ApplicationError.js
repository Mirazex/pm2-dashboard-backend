export default class ApplicationError extends Error {
    static NotUnique = (message) => new ApplicationError(1, 409, message || `Element is not unique`);
    static NotFound = () => new ApplicationError(2, 404, `Element not found`);
    static NotCreated = () => new ApplicationError(3, 400, `Element not created`);
    static NoAuthHeader = () => new ApplicationError(4, 403, `Authorization header not specified`);
    static BadUserToken = () => new ApplicationError(5, 401, `Bad token`);
    static InvalidCredentials = () => new ApplicationError(6, 401, `Invalid credentials`);
    static RequiredAttributes = () => new ApplicationError(7, 400, `Required attributes not specified`);
    static NotCommand = (command) => new ApplicationError(7, 400, `Application command ${command} not found}`);
    static JsonValidation = (message) => new ApplicationError(8, 422, `JSON is bad: ${message}`);
    static AlreadyExists = () => new ApplicationError(9, 409, `Already exists`);
    static EnvironmentNotFound = (key) => new ApplicationError(12, 500, `Application environment with key '${key}' not set`);
    static MethodNotImplemented = (method) => new ApplicationError(13, 500, `Method '${method}' not implemented`);
    static DatabaseError = () => new ApplicationError(14, 500, 'Database service error');

    constructor(code, httpStatusCode, message) {
        super();
        this.code = code;
        this.httpStatusCode = httpStatusCode;
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
