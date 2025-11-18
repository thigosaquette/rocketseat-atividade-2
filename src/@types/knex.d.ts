import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: Date;
      updated_at: Date;
    };
    meals: {
      id: string;
      user_id: string;
      name: string;
      description: string;
      date_time: Date;
      is_diet: boolean;
      created_at: Date;
      updated_at: Date;
    };
  }
}

