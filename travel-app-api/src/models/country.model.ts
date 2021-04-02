import {Entity, model, property, hasMany} from '@loopback/repository';
import {Sight} from './sight.model';

export interface TranslationsItem {
  name: string;
  description: string;
  shortDescription: string;
  capital: string;
}

export interface TranslationsObject {
  [key: string]: TranslationsItem;
}

@model()
export class Country extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  capital: string;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  capitalCoordinates: number[];

  @property({
    type: 'string',
    required: true,
  })
  timeZone: string;

  @property({
    type: 'string',
    required: true,
  })
  currency: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  description: string[];

  @property({
    type: 'string',
    required: true,
  })
  shortDescription: string;

  @property({
    type: 'string',
    required: true,
  })
  linkToPhoto: string;

  @property({
    type: 'string',
    required: true,
  })
  linkToVideo: string;
  
  @property({
    type: 'object',
    default: {},
  })
  translations?: TranslationsObject;

  @hasMany(() => Sight)
  sights: Sight[];

  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
