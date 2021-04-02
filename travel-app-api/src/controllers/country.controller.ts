import { repository } from '@loopback/repository';
import { post, param, get, getModelSchemaRef, patch, del, requestBody, response, HttpErrors } from '@loopback/rest';
import { Country } from '../models';
import { authenticate } from '@loopback/authentication';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { UserRepository } from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { CountryRepository } from '../repositories';

export class CountryController {
  constructor(
    @repository(CountryRepository)
    public countryRepository: CountryRepository,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @authenticate('jwt')
  @post('/countries')
  @response(200, {
    description: 'Country model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Country) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {
            title: 'NewCountry',
            exclude: ['id'],
          }),
        },
      },
    })
    country: Omit<Country, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Country> {
    const user = await this.userRepository.findById(currentUserProfile[securityId]);
    if (!user.isAdmin) {
      throw new HttpErrors[403]();
    }
    return this.countryRepository.create(country);
  }

  @get('/countries')
  @response(200, {
    description: 'Array of Country model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Country, { includeRelations: true }),
        },
      },
    },
  })
  async find(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  @get('/countries/{code}')
  @response(200, {
    description: 'Country model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Country, { includeRelations: true }),
      },
    },
  })
  async findById(@param.path.string('code') code: string): Promise<Country | null> {
    return this.countryRepository.findOne({ where: { code }, include: [{ relation: 'sights' }] });
  }

  @authenticate('jwt')
  @patch('/countries/{id}')
  @response(204, {
    description: 'Country PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, { partial: true }),
        },
      },
    })
    country: Country,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    const user = await this.userRepository.findById(currentUserProfile[securityId]);
    if (!user.isAdmin) {
      throw new HttpErrors[403]();
    }
    await this.countryRepository.updateById(id, country);
  }

  @authenticate('jwt')
  @del('/countries/{id}')
  @response(204, {
    description: 'Country DELETE success',
  })
  async deleteById(
    @param.path.string('id') id: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    const user = await this.userRepository.findById(currentUserProfile[securityId]);
    if (!user.isAdmin) {
      throw new HttpErrors[403]();
    }
    await this.countryRepository.deleteById(id);
  }
}
