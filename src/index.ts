export interface User {
    id: number;
    name: string;
    email?: string;
    isActive?: boolean;
}

export function createUser(id: number, name: string, email?: string, isActive: boolean = true) : User {
    return { id, name, email, isActive };
}

const testUser = createUser(1, "Alice", "alice@example.com", true);
console.log("createUser:", testUser); // { id: 1, name: 'Alice', email: 'alice@example.com', isActive: true }

export interface Book {
    title: string;
    author: string;
    year?: number;
    genre: "fiction" | "non-fiction";
}

export function createBook(book: Book) : Book {
    return book;
}

const testBook = createBook({ title: "1984", author: "George Orwell", genre: "fiction" });
console.log("createBook:", testBook); // { title: '1984', author: 'George Orwell', genre: 'fiction' }

export function calculateArea(shape:'square', side: number): number;
export function calculateArea(shape:'circle', side: number): number;
export function calculateArea(shape: 'square' | "circle", value: number): number {
    if(shape === 'square') return value * value;
    return Math.PI * value * value;
}
console.log("calculateArea (square 5):", calculateArea('square', 5)); // 25

export type Status = 'active' | 'inactive' | 'new';
export function getStatusColor(status: Status) : string {
    const color = { active: 'green', inactive: 'red', new: 'orange'};
    return color[status];
}
console.log("getStatusColor ('active'):", getStatusColor('active')); // green

export type StringFormatter = (str: string, uppercase?: boolean) => string;

export const capitalizeFirst: StringFormatter = (str, uppercase = false) => {
    if(str.length === 0) return str;

    const firstChar = str[0]?.toUpperCase();
    const restStr = str.slice(1);

    return uppercase ? (firstChar + restStr).toUpperCase() : firstChar + restStr;
}

export const trimAndTransform: StringFormatter = (str, uppercase = false) => {
    const trimmedStr = str.trim();

    return uppercase ? trimmedStr.toUpperCase() : trimmedStr;
}
console.log("capitalizeFirst:", capitalizeFirst("hello world")); // Hello world
console.log("trimAndTransform:", trimAndTransform("  hello world  ")); // hello world

export function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

export interface HasId {
    id: number;
}

export function findById<T extends HasId>(items: T[], id:number) : T | undefined {
    return items.find(item => item.id === id);
}