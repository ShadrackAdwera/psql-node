export const toCamelCase = <T>(rows: T[]) => {
  return rows.map((row) => {
    const replaced: { [key: string]: string } = {};
    // regex to replace Database snake_case With Javascript camelCase
    for (let key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace('_', '')
      );
      replaced[camelCase] = row[key as keyof T] as string;
    }
    return replaced;
  });
};
