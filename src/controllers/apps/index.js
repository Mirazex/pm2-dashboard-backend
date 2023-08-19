import Controller from '@/lib/core/Controller.js';
import CheckAuth from '@/middlewares/CheckAuth.js';
import PMService from '@/services/PMService.js';

export default class GetApps extends Controller {
    path = '/apps';
    method = Controller.RequestMethod.GET;
    middlewares = [CheckAuth];

    async request(ctx) {
        return await PMService.list();
    }
}
