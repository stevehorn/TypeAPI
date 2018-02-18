import { Router } from 'express';
import * as post from './post';

export default () => {
  let api = Router();

  api.use('/post', post);

  return api;
}
