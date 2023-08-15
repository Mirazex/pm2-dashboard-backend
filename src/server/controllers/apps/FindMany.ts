import { Controller } from '@/core/Controller';
import { HttpContext } from '@/core/HttpContext';
import CheckAuth from '@/server/middlewares/CheckAuth';
import PMService from '@/server/services/PMService';

export default class FinaMany extends Controller {
    path = '/apps';
    method = Controller.RequestMethod.GET;
    middlewares = [CheckAuth];

    pmService = PMService

    public async request(ctx: HttpContext) {
        return await PMService.list();
    }
}
