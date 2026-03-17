import { describe, it, expectTypeOf } from 'vitest';
import { where, groupBy, having, sort, query } from './index.js';

type User = { id: number; name: string; age: number; city: string };

describe('Lab 5 - Type System Order', () => {
  it('should compile with correct order', () => {
    const q = query<User>(
      where('name', 'John'),
      groupBy('city'),
      having(g => g.items.length > 1),
      sort('key')
    );
    expectTypeOf(q).toBeFunction();
  });

  it('should NOT compile if sort is before where', () => {
    query<User>(
      sort('age'), 
      where('name', 'John')
    );
  });

  it('should NOT compile if groupBy is after having', () => {
    query<User>(
      groupBy('city'),
      having(g => g.items.length > 0),
      groupBy('name')
    );
  });

    it('should fail on wrong order', () => {
    // @ts-expect-error
    query(sort('key'), where('id', 1));
  });

});