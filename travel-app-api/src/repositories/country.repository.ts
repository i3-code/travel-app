import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Country, CountryRelations, Sight} from '../models';
import {SightRepository} from './sight.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {

  public readonly sights: HasManyRepositoryFactory<Sight, typeof Country.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SightRepository') protected sightRepositoryGetter: Getter<SightRepository>,
  ) {
    super(Country, dataSource);
    this.sights = this.createHasManyRepositoryFactoryFor('sights', sightRepositoryGetter,);
    this.registerInclusionResolver('sights', this.sights.inclusionResolver);
  }
}
