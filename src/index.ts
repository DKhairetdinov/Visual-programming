export type Transform<T> = (data: T[]) => T[];

export type Group<T, K extends keyof T> = {
  key: T[K];
  items: T[];
};

export type WhereOp<T> = Transform<T> & { tag: 'where' };
export type GroupByOp<T, K extends keyof T> = ((data: T[]) => Group<T, K>[]) & { tag: 'groupBy' };
export type HavingOp<T, K extends keyof T> = ((data: Group<T, K>[]) => Group<T, K>[]) & { tag: 'having' };
export type SortOp<V> = ((data: V[]) => V[]) & { tag: 'sort' };

export const where = <T, K extends keyof T>(key: K, value: T[K]): WhereOp<T> => {
  const fn = (data: T[]) => data.filter((item) => item[key] === value);
  return Object.assign(fn, { tag: 'where' as const });
};

export const sort = <V>(key: keyof V): SortOp<V> => {
  const fn = (data: V[]) => [...data].sort((a, b) => (a[key] > b[key] ? 1 : -1));
  return Object.assign(fn, { tag: 'sort' as const });
};

export const groupBy = <T, K extends keyof T>(key: K): GroupByOp<T, K> => {
  const fn = (data: T[]) => {
    const result = data.reduce((acc, item) => {
      const val = item[key] as any;
      if (!acc[val]) acc[val] = { key: item[key], items: [] };
      acc[val].items.push(item);
      return acc;
    }, {} as any);
    return Object.values(result);
  };
  return Object.assign(fn, { tag: 'groupBy' as const }) as GroupByOp<T, K>;
};

export const having = <T, K extends keyof T>(predicate: (group: Group<T, K>) => boolean): HavingOp<T, K> => {
  const fn = (groups: Group<T, K>[]) => groups.filter(predicate);
  return Object.assign(fn, { tag: 'having' as const });
};

export function query<T, K extends keyof T = any>(
  ...transforms: [
    ...WhereOp<T>[], 
    ...GroupByOp<T, K>[], 
    ...HavingOp<T, K>[],
    ...SortOp<any>[]
  ]
): (data: T[]) => any {
  return (data: T[]) => {
    return transforms.reduce((currentData, nextTransform) => nextTransform(currentData as any), data as any);
  };
}