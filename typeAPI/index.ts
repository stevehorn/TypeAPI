import { Express, Request, Response, NextFunction, RequestHandler } from 'express';
import { getConnection } from 'typeorm';
import { catchAsyncErrors } from '../src/utils/catchAsyncErrors';

export default function typeAPI(app: Express) {
  let connection = getConnection();
  let metaData = connection.entityMetadatas;

  metaData.forEach(entity => {
    app.get(`/api/${entity.name}/list`, catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
      let repository = getConnection().getRepository(entity.name);

      // ?pageSize=10&page=2&skip=0&take=100&orderBy=text&orderByDirection=asc&where=[{prop:"text",match:'eq',val:text3}]
      let queryBuilder = connection.getRepository(entity.name).createQueryBuilder();

      // Filtering
      if (req.query.where) {
        let predicates: Array<{ prop: string, match: string, val: string }> = JSON.parse(req.query.where);
        let where = '';
        let whereParameters = [];
        let parameterIndex = 1;
        let i = 0;
        if (predicates.length > 0) {
          predicates.forEach(predicate => {
            if (i > 0) {
              where += 'AND ';
            }
            where += `${predicate.prop} = :${predicate.prop} `;
            whereParameters[`${predicate.prop}`] = predicate.val;
            i++;
          });
          queryBuilder.where(where, whereParameters);
        }
      }

      // Ordering
      if (req.query.orderBy) {
        queryBuilder.orderBy(req.query.orderBy, (req.query.orderByDirection ? req.query.orderByDirection : 'ASC'));
      }

      // Paging
      if (req.query.pageSize) {
        let skipCount = req.query.pageSize * (req.query.page - 1);
        if (req.query.page === 1) {
          skipCount = 0;
        }
        queryBuilder.skip(skipCount);
        queryBuilder.take(req.query.pageSize);
      }

      let entities = await queryBuilder.getMany();
      res.json(entities);
    }));

    app.get(`/api/${entity.name}/:id`, catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
      let postRepository = getConnection().getRepository(entity.name);
      let result = await postRepository.findOneById(req.params.id);
      res.json(result);
    }));

    app.post(`/api/${entity.name}`, catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
      let postRepository = getConnection().getRepository(entity.name);
      let result = await postRepository.save(req.body);
      res.json(result);
    }));

    app.put(`/api/${entity.name}`, catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
      let postRepository = getConnection().getRepository(entity.name);
      let result = await postRepository.save(req.body);
      res.json(result);
    }));

    app.delete(`/api/${entity.name}/:id`, catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
      let postRepository = getConnection().getRepository(entity.name);
      let result = await postRepository.delete(req.params.id);
      res.json(result);
    }));
  });
}
