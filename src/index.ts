export type Transform<T> = (data: T[]) => T[];

export type Where<T> = <K extends keyof T>(key: K, value: T[K]) => Transform<T>;

export type Sort<T> = <K extends keyof T>(key: K) => Transform<T>;

export const where: Where<any> =
  (key, value) => 
    (data) =>
      data.filter((item) => item[key] === value);

export const sort: Sort<any> =
  (key) =>
    (data) =>
        [...data].sort((a, b) => {
          const aval = a[key];
          const bval = b[key];
          if(aval < bval) return -1;
          if(aval > bval) return 1;
          return 0;
        });

export type Group<T, K extends keyof T> = {
  key: T[K]; 
  items: T[];
};

export type GroupBy<T> = <K extends keyof T>(key: K) => (data: T[]) => Group<T, K>[];

export const groupBy: GroupBy<any> = (key) => (data) => {
  const result = data.reduce((acc, item) => {
    const val = item[key];
    if(!acc[val]) {
      acc[val] = { key: val, items: [] };
    }
    acc[val].items.push(item);

    return acc;
  }, {} as any);

  return Object.values(result);
}

export type GroupTransform<T, K extends keyof T> = (groups: Group<T, K>[]) => Group<T, K>[];

export type Having<T> = <K extends keyof T>(predicate: (group: Group<T, K>)=> boolean) => GroupTransform<T, K>;

export const having: Having<any> = (predicate) => (groups) => {
  return groups.filter(predicate);
}

export function query<T>(...transforms: Transform<any>[]) : Transform<any> {
    return (data: T[]) => {
      return transforms.reduce((currentData, nextTransform) => nextTransform(currentData), data as any);
    };
}