import { randomUUID } from 'node:crypto';
import { PeopleDatabase } from '../database';
import { logger } from '../helpers/log';

interface ICreatePeopleModel {
  apelido: string;
  nome: string;
  nascimento: string;
  stack: string[];
}

const peopleService = {
  async createPeople({ apelido, nome, nascimento, stack }: ICreatePeopleModel) {
    try {
      const all = apelido.concat(nome, ...stack);
      const id = randomUUID();

      await PeopleDatabase().insert({ id, apelido, nome, nascimento, stack: stack.toString(), all });
      return [true, 'inserted'];
    } catch (err) {
      logger.error('Failed to insert user', err);
      return [false, err];
    }
  },
  
  async getPeopleById (id: string) {
    return PeopleDatabase().where('id', id);
  },
  
  async getPeopleByTerm (term?: string) {
    if (!term) return PeopleDatabase().select('id', 'apelido', 'nome', 'nascimento', 'stack').limit(50);

    return PeopleDatabase()
      .select('id', 'apelido', 'nome', 'nascimento', 'stack')
      .whereILike('all', `%${term}%`).limit(50);
  },
  
  async countPeople () {
    return PeopleDatabase().countDistinct('id');
  }
}

export default peopleService;