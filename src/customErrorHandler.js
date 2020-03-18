import Boom from '@hapi/boom';
import log from './api/logging/logs';

export default {
    catch404 (req, res, next) {
        next(Boom.notFound('Resource not found.'));
    },
    async parse(error) {
        if(error.code === 11000) {
            return Boom.conflict(error.errmsg.split('E11000 duplicate key error collection: ').join(''));
        }
        if (!Boom.isBoom(error)) return Boom.boomify(error);
        await log.record(error, false);
        return error;
    }
}