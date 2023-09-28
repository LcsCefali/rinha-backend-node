import { randomUUID } from 'node:crypto';
import { PeopleDatabase } from '../database';
import { logger } from '../helpers/log';
import { ICreatePeopleModel } from '~/interfaces/people';

export class PeopleService {
  async createPeople({ apelido, nome, nascimento, stack }: ICreatePeopleModel) {
    try {
      // const newStack = JSON.stringify(stack);
      const newStack = stack?.toString();

      const all = apelido.concat(nome, newStack);
      const id = randomUUID();

      await PeopleDatabase().insert({ id, apelido, nome, nascimento, stack: newStack, all });

      return id;
    } catch (err) {
      logger.error('Failed to insert user', err);
      return false;
    }
  }
  
  async getPeopleById (id: string) {
    const people = await PeopleDatabase().where('id', id).first();

    if (!people) return false;

    return {
      ...people,
      stack: (people.stack ?? '')?.split(',')
    }
  }
  
  async getPeopleByTerm (term?: string) {
    const peoples = await PeopleDatabase()
      .select('id', 'apelido', 'nome', 'nascimento', 'stack')
      .whereILike('all', `%${term}%`).limit(50);
    
    return peoples.map((people: any) => ({
      ...people,
      stack: (people.stack ?? '')?.split(',')
    }))
  }
  
  async countPeople () {
    return PeopleDatabase().countDistinct('id').first();
  }
}

const peopleService = new PeopleService();
export default peopleService;