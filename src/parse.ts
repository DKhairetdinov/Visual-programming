import { readFile, writeFile } from 'node:fs/promises';

export function csvToJSON(input: string[], delimiter: string): object[] {
    if (input.length == 0) return [];

    let head = input[0].split(delimiter);

    let result: object[] = [];

    for (let i = 1; i < input.length; i++) {
        let rowValue = input[i].split(delimiter);

        if (rowValue.length !== head.length) {
            throw new Error(`Несоответствие по кол-ву параметров! Строка: ${i}`);
        }

        let rowObject: Record<string, (string | number | undefined)> = {};

        for (let j = 0; j < head.length; j++) {
            let value = rowValue[j];

            let numericValue = Number(value);

            if (!isNaN(numericValue)) {
                rowObject[`${head[j]}`] = numericValue;
            } else {
                rowObject[`${head[j]}`] = value;
            }
        }
        result.push(rowObject);
    }
    return result;
}

export async function formatCSVFileToJSONFile(
    input: string, 
    output: string, 
    delimiter: string
): Promise<void> {
    const fileContent = await readFile(input, 'utf-8');
    const lines = fileContent.split(/\n/);
    const jsonData = csvToJSON(lines, delimiter);
    
    await writeFile(output, JSON.stringify(jsonData, null, 2));
}

console.log(csvToJSON(["p1;p2;p3;p4", "1;A;b;c", "2;B;v;d"], ';'));
