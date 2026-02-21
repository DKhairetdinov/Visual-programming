import { describe, it, expect } from 'vitest';
import { createUser, createBook, calculateArea, getStatusColor, capitalizeFirst, trimAndTransform, getFirstElement, findById } from './index.js';

describe('TypeScript Homework Tests', () => {
    it('should create a user', () => {
        const user = createUser(1, 'Ivan');
        expect(user.isActive).toBe(true);
        expect(user.name).toBe('Ivan');
    });

    it('should create a book', () => {
        const book = createBook({ title: '1984', author: 'Orwell', genre: 'fiction' });
        expect(book.year).toBeUndefined();
        expect(book.genre).toBe('fiction');
    });

    it('should calculate areas', () => {
        expect(calculateArea('square', 5)).toBe(25);
        expect(calculateArea('circle', 10)).toBeCloseTo(314.159);
    });

    it('should return correct status color', () => {
        expect(getStatusColor('active')).toBe('green');
    });

    it('should format strings', () => {
        expect(capitalizeFirst('hello')).toBe('Hello');
        expect(trimAndTransform('  hello  ', true)).toBe('HELLO');
    });

    it('should get first element', () => {
        expect(getFirstElement([1, 2, 3])).toBe(1);
        expect(getFirstElement([])).toBeUndefined();
    });

    it('should find by id', () => {
        const items = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
        expect(findById(items, 2)).toEqual({ id: 2, name: 'B' });
    });
});