export const validationRules = {
    name: {
        required: true,
        minLength: 4
    },
    dateOfBirth: {
        required: true
    },
    employment: {
        required: true
    },
    annualIncome: {
        required: true,
        match: /^(?:[1-9]\d*)$/g
    },
    houseNumber: {
        required: true,
        match: /^(?:[1-9]\d*)$/g
    },
    postCode: {
        required: true,
        match: /^\w+$/g
    }
}

export function isValidAgainst(rule: string, name: string, value: string): string | undefined {
    switch(rule) {
        case "required": {
            if (value === "") {
                return `${name} is required.`;
            }
            break;
        }
        case "minLength": {
            if (value.length < validationRules[name].minLength) {
                return `${name} needs a min length of ${validationRules[name].minLength}.`;
            }
            break;
        }
        case "maxLength": {
            if (value.length > validationRules[name].maxLength) {
                return `${name} needs a max length of ${validationRules[name].maxLength}.`;
            }
            break;
        }
        case "match": {
            if (!value.match(validationRules[name].match)) {
                return `${name} has invalid characters.`;
            }
            break;
        }
        default:
            return undefined;
    }
}