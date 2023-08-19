import ApplicationError from './ApplicationError.js';

export default async function ServerException(error, request, response, _) {
    console.error(error);
    if (error instanceof ApplicationError) {
        return response.status(error.httpStatusCode).json({ error: error.message, code: error.code, isSuccess: false });
    }

    return response.status(500).json({ error: error.message, code: -1, isSuccess: false });
}
