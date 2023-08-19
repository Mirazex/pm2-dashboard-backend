export default class Response {
    #response;

    constructor(response) {
        this.#response = response;
    }

    setCookie(name, value, options) {
        this.#response.cookie(name, value, options);
    }

    clearCookie(name) {
        this.#response.clearCookie(name);
    }
}
