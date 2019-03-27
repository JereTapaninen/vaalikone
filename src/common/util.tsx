export const getLocationStateObject = (location: any, variable: string): any =>
    location.state ? location.state[variable] : undefined;

export const removeDuplicates = (values: string[]) =>
    // @ts-ignore
    [...new Set(values)];
