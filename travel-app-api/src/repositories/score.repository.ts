import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Score, ScoreRelations} from '../models';

export class ScoreRepository extends DefaultCrudRepository<
  Score,
  typeof Score.prototype.id,
  ScoreRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Score, dataSource);
  }
}
