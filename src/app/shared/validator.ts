
export const regExps: { [key: string]: RegExp } = {
    str: /^[a-zA-Z]/, // Validates only strings
    num: /^\d+$/, // Validates only numbers
    numdecimales: /^\d+(\.\d{1,2})?$/
};

// Modulo inventario
export const errorMessages: { [key: string]: string } = {
    longitud: 'solo decimales (4.2)',
    bending: 'solo decimales (4.2)',
    cases: 'Required and only numbers',
    todayCases: 'Required and only numbers',
    deaths: 'Required and only numbers',
    todayDeaths: 'Required and only numbers',
    recovered: 'Required and only numbers',
    active: 'Required and only numbers',
};
