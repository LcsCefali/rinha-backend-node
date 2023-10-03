import { rawQuery } from '~/database';
import { ICreatePeopleModel, People } from '~/interfaces/people';

export class PeopleRepository {
  async createPeople({ id, apelido, nome, nascimento, stack }: ICreatePeopleModel): Promise<boolean> {
    await rawQuery<Pick<People, 'id'>>(`
    INSERT INTO people (id, apelido, nome, nascimento, stack)
		VALUES($1, $2, $3, $4, $5::json);
    `, [id, apelido, nome, nascimento, JSON.stringify(stack)]);

    return true;
  }

  async verifyApelidoExist (apelido: string) {
    const { result: [result] } = await rawQuery<{ exist: number }>(`
    SELECT
      COUNT(1) as exist
    FROM
      people
    WHERE
      apelido = $1;
    `, [apelido]);

    return Number(result.exist) > 0;
  }
  
  async getPeopleById (id: string): Promise<People> {
    const { result: [result] } = await rawQuery<People>(`
    SELECT
      id,
      apelido,
      nome,
      nascimento,
      stack
    FROM
      people
    WHERE
      id = $1;
    `, [id]);

    return result;
  }
  
  async getPeopleByTerm (term: string): Promise<People[]> {
    const { result } = await rawQuery<People>(`
    SELECT
      id,
      apelido,
      nome,
      nascimento,
      stack
    FROM
      people
    WHERE
      searchable ILIKE $1
    LIMIT 50;
    `, [`%${term}%`]);

    return result
  }
  
  async countPeople (): Promise<number> {
    const { result: [result] } = await rawQuery<{ total: number }>(`
    SELECT COUNT(1) as total FROM people
    `);

    return result.total ?? 0;
  }
}

const peopleRepository = new PeopleRepository();
export default peopleRepository