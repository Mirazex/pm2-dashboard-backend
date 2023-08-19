import Controller from '@/lib/core/Controller.js';
import CheckAuth from '@/middlewares/CheckAuth.js';
import PMService from '@/services/PMService.js';

export default class FinaMany extends Controller {
    path = '/apps';
    method = Controller.RequestMethod.GET;
    middlewares = [CheckAuth];

    pmService = PMService;

    async request(ctx) {
        return await PMService.list();
    }
}
