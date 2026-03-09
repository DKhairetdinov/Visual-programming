import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFile, writeFile } from 'node:fs/promises';
import { csvToJSON, formatCSVFileToJSONFile } from './parse';

vi.mock('node:fs/promises');

describe('csvToJSON', () => {
    it('should properly parse csv to json', () => {
        const input = ["p1;p2;p3;p4", "1;A;b;c", "2;B;v;d"];
        const expected = [
            { p1: 1, p2: 'A', p3: 'b', p4: 'c' },
            { p1: 2, p2: 'B', p3: 'v', p4: 'd' }
        ];
        expect(csvToJSON(input, ';')).toEqual(expected);
    });

    it('should throw Error if cols not equal rows', () => {
        const input = ["p1;p2", "1;A", "2"];
        expect(() => csvToJSON(input, ';')).toThrow("Несоответствие по кол-ву параметров! Строка: 2");
    });
});

describe('formatCSVFileToJSONFile', () => {

    it('should call readFile() and writeFile() with right params', async () => {
        const mockContent = "name;age\nAlice;25\nBob;30";
        
        vi.mocked(readFile).mockResolvedValue(mockContent);
        vi.mocked(writeFile).mockResolvedValue(undefined);

        const inPath = 'input.csv';
        const outPath = 'output.json';
        const delim = ';';

        await formatCSVFileToJSONFile(inPath, outPath, delim);

        
        expect(readFile).toHaveBeenCalledWith(inPath, 'utf-8');

        
        const expectedJSON = JSON.stringify([
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 }
        ], null, 2);

        
        expect(writeFile).toHaveBeenCalledWith(outPath, expectedJSON);
    });
});