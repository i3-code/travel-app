import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Sight, SightRelations, Country} from '../models';
import {CountryRepository} from './country.repository';

export class SightRepository extends DefaultCrudRepository<
  Sight,
  typeof Sight.prototype.id,
  SightRelations
> {

  public readonly country: BelongsToAccessor<Country, typeof Sight.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(Sight, dataSource);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);
  }
}
