import {Entity, model, property} from '@loopback/repository';

@model()
export class Score extends Entity {
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
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  countryId: string;

  @property({
    type: 'string',
    required: true,
  })
  sightId: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;


  constructor(data?: Partial<Score>) {
    super(data);
  }
}

export interface ScoreRelations {
  // describe navigational properties here
}

export type ScoreWithRelations = Score & ScoreRelations;
