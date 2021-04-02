import { repository } from '@loopback/repository';
import { authenticate } from '@loopback/authentication';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { UserRepository } from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { post, param, get, getModelSchemaRef, patch, del, requestBody, response, HttpErrors } from '@loopback/rest';
import { Score } from '../models';
import { ScoreRepository } from '../repositories';

interface ScoreMap {
  [sightId: string]: SightScore;
}

interface SightScore {
  averageValue: number;
  scores: ShortScore[];
}

interface ShortScore {
  username: string;
  value: number;
}

export class ScoreController {
  constructor(
    @repository(ScoreRepository)
    public scoreRepository: ScoreRepository,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @authenticate('jwt')
  @post('/scores')
  @response(200, {
    description: 'Score model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Score) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Score, {
            title: 'NewScore',
            exclude: ['id'],
          }),
        },
      },
    })
    score: Omit<Score, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Score | null> {
    if (score.value < 1 || score.value > 5) {
      throw new HttpErrors[422]();
    }
    const currentScore = await this.scoreRepository.findOne({
      where: { userId: currentUserProfile[securityId], sightId: score.sightId },
    });
    if (currentScore) {
      await this.scoreRepository.updateById(currentScore.id, {
        ...currentScore,
        userId: currentUserProfile[securityId],
        value: score.value,
      });
      return this.scoreRepository.findById(currentScore.id);
    } else {
      return this.scoreRepository.create({
        ...score,
        userId: currentUserProfile[securityId],
      });
    }
  }

  @get('/scores/{countryId}')
  @response(200, {
    description: 'Array of Score model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Score, { includeRelations: true }),
        },
      },
    },
  })
  async find(@param.path.string('countryId') countryId: string): Promise<ScoreMap> {
    const scoreMap: ScoreMap = {};
    const scores = await this.scoreRepository.find({ where: { countryId } });

    const users = await this.userRepository.find();
    scores.reduce((map: ScoreMap, score: Score) => {
      if (!map[score.sightId]) {
        map[score.sightId] = { scores: [] as ShortScore[] } as SightScore;
      }
      const username = users.find((user) => user.id === score.userId)?.username || 'unknown';
      map[score.sightId].scores.push({ username, value: score.value });
      return map;
    }, scoreMap);

    Object.keys(scoreMap).forEach((key) => {
      scoreMap[key].averageValue =
        scoreMap[key].scores.reduce((avg, score) => avg + score.value, 0) / scoreMap[key].scores.length;
    });

    return scoreMap;
  }

  @del('/scores/{id}')
  @response(204, {
    description: 'Score DELETE success',
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
    await this.scoreRepository.deleteById(id);
  }
}
