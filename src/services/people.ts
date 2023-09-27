import { randomUUID } from 'node:crypto';
import { PeopleDatabase } from '../database';
import { logger } from '../helpers/log';
import { ICreatePeopleModel } from '~/interfaces/people';



const peopleService = {
  async createPeople({ apelido, nome, nascimento, stack }: ICreatePeopleModel) {
    try {
      const all = apelido.concat(nome, stack?.toString());
      const id = randomUUID();

      await PeopleDatabase().insert({ id, apelido, nome, nascimento, stack: stack?.toString(), all });
      return id;
    } catch (err) {
      logger.error('Failed to insert user', err);
      return false;
    }
  },
  
  async getPeopleById (id: string) {
    const people = await PeopleDatabase().where('id', id).first();

    if (!people) return false;

    return {
      ...people,
      stack: (people.stack ?? '')?.split(',')
    }
  },
  
  async getPeopleByTerm (term?: string) {
    const peoples = await PeopleDatabase()
      .select('id', 'apelido', 'nome', 'nascimento', 'stack')
      .whereILike('all', `%${term}%`).limit(50);
    
    return peoples.map(people => ({
      ...people,
      stack: (people.stack ?? '')?.split(',')
    }))
  },
  
  async countPeople () {
    return PeopleDatabase().countDistinct('id').first();
  }
}

export default peopleService;