// Collection of reusable RegExps
export const regExps: { [key: string]: RegExp } = {
    str: /^[a-zA-Z]/, // Validates only strings
    num: /^\d+$/, // Validates only numbers
};

// Collection of reusable error messages
export const errorMessages: { [key: string]: string } = {
    country: 'Required and only strings',
    cases: 'Required and only numbers',
    todayCases: 'Required and only numbers',
    deaths: 'Required and only numbers',
    todayDeaths: 'Required and only numbers',
    recovered: 'Required and only numbers',
    active: 'Required and only numbers',
};
