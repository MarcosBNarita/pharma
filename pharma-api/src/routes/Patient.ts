import { Router } from 'express';

import * as PatientsController from '@controllers/PatientsController';

const patientsRouter = Router();

patientsRouter.get('/', PatientsController.index);
patientsRouter.post('/', PatientsController.store);
patientsRouter.get('/:_id', PatientsController.show);
patientsRouter.put('/:_id', PatientsController.update);
patientsRouter.delete('/:_id', PatientsController.destroy);

export default patientsRouter;
