export const requiredValidation = (value) => !!value

export const numberValidation = (value) => /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/.test(value)

export const alphabetsSpaceValidation = (value) => /^[a-zA-Z ]+$/.test(value)
