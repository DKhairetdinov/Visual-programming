import { it, describe, expect } from 'vitest';
import { 
    where, 
    sort, 
    groupBy, 
    having, 
    query, 
} from './index';

type User = {
    id: number;
    name: string;
    surname: string;
    age: number;
    city: string;
};

const mockUsers: User[] = [
    { id: 1, name: "John", surname: "Doe", age: 30, city: "NY" },
    { id: 2, name: "Jane", surname: "Doe", age: 25, city: "NY" },
    { id: 3, name: "John", surname: "Smith", age: 40, city: "LA" },
    { id: 4, name: "Mike", surname: "Brown", age: 35, city: "LA" },
];

describe('Lab - 4', () => {

    describe('Individual Transformations', () => {
        
        it('where: should filter items by key and value', () => {
            // Убрали <User>, так как в index.ts уже Where<any>
            const filterJohn = where("name", "John"); 
            const result = filterJohn(mockUsers);
            expect(result).toHaveLength(2);
            expect(result.every((u: any) => u.name === "John")).toBe(true);
        });

        it('sort: should sort items by key in ascending order', () => {
            const sortByAge = sort("age");
            const result = sortByAge(mockUsers);
            expect(result[0].age).toBe(25);
            expect(result[3].age).toBe(40);
        });

        it('groupBy: should group items by a specific key', () => {
            const groupByCity = groupBy("city");
            const result = groupByCity(mockUsers);
            
            expect(result).toHaveLength(2);
            const nyGroup = result.find((g: any) => g.key === "NY");
            expect(nyGroup?.items).toHaveLength(2);
        });

        it('having: should filter groups based on predicate', () => {
            const groups = groupBy("city")(mockUsers);
            const filterGroups = having((g: any) => g.items.some((u: any) => u.age > 35));
            const result = filterGroups(groups);

            expect(result).toHaveLength(1);
            expect(result[0].key).toBe("LA");
        });
    });

    describe('Query function', () => {

        it('should combine multiple where and sort steps', () => {
            const pipeline = query(
                where("surname", "Doe"),
                sort("age")
            );
            const result = pipeline(mockUsers);

            expect(result).toHaveLength(2);
            expect(result[0].name).toBe("Jane");
            expect(result[1].name).toBe("John");
        });

        it('should execute a full pipeline', () => {
            const complexQuery = query(
                where("surname", "Doe"),
                groupBy("city"),
                having((g: any) => g.items.length > 1)
            );

            const result = complexQuery(mockUsers);

            expect(result).toHaveLength(1);
            expect(result[0].key).toBe("NY");
            expect(result[0].items).toHaveLength(2);
        });

        it('should return an empty array if filter matches nothing', () => {
            const pipeline = query(
                where("name", "NonExistent")
            );
            expect(pipeline(mockUsers)).toEqual([]);
        });
    });
});