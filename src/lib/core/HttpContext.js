export default class HttpContext {
    constructor(request, response, next) {
        this.request = request;
        this.response = response;
        this.next = next;
        this.context = {
            accessToken: null,
        };
    }
}
