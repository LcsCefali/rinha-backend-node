import { logger } from '../helpers/log';
import { ICreatePeopleModel } from '~/interfaces/people';
import peopleRepository, { PeopleRepository } from '~/repositories/people';

export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async createPeople(model: ICreatePeopleModel) {
    try {
      await this.peopleRepository.createPeople(model);
      return true;
    } catch (err) {
      logger.error('Failed to insert user', err);
      return false;
    }
  }
  
  async getPeopleById(id: string) {
    return this.peopleRepository.getPeopleById(id);
  }
  
  async getPeopleByTerm(term: string) {
    return this.peopleRepository.getPeopleByTerm(term);
  }
  
  async countPeople() {
    return this.peopleRepository.countPeople();
  }
}

const peopleService = new PeopleService(peopleRepository);
export default peopleService;