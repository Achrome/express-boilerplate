import index from 'controllers';
import { Router } from 'express';

const api = Router();
api.get('/', index.get);

export default api;
