import * as express from 'express';
import { catchAsyncErrors } from '../utils/catchAsyncErrors';
import * as path from 'path';
import * as fs from 'fs';
import { Post } from '../entity/post';
import { getConnection } from 'typeorm';
import { Response, Request } from 'express';

let router = express.Router();

// router.get('/list', catchAsyncErrors(async function (req: Request, res: Response, next: express.NextFunction) {
//   let postRepository = getConnection().getRepository(Post);
//   // TODO: Filter by user id when that becomes available.
//   let posts = postRepository.find();
//   res.json(posts);
// }));

// router.post('/', catchAsyncErrors(async function (req: Request, res: Response, next: express.NextFunction) {
//   let postRepository = getConnection().getRepository(Post);
//   let result = await postRepository.save(req.body);
//   res.json(result);
// }));

// router.put('/', catchAsyncErrors(async function (req: Request, res: Response, next: express.NextFunction) {
//   let postRepository = getConnection().getRepository(Post);
//   let result = await postRepository.save(req.body);
//   res.json(result);
// }));

// router.delete('/:id', catchAsyncErrors(async function (req: Request, res: Response, next: express.NextFunction) {
//   let postRepository = getConnection().getRepository(Post);
//   let result = await postRepository.delete(req.params.id);
//   res.json(result);
// }));

module.exports = router;
