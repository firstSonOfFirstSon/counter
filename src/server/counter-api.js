import { Router } from 'express';
import {update} from '../utils/actionCreators';

const router = Router();

const dispatchAndRespond = (req, res, action) => {
   req.store.dispatch(action)
   res.status(200).json(action)
};


router.put("/counter/:value", (req, res) =>
   dispatchAndRespond(
      req,
      res,
      update( Number(req.params.value) )
   )
);

export default router;
