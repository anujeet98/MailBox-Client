
const text = (input: string) => {
    if(input === undefined || input === null || input.length===0)
        return true;
    return false;
}

const number = (input: number) => {
    if(input === undefined || input === null)
        return true;
    return false;
}

// module.exports.file = (input) => {
//     // if(input === undefined || !input.mimetype.startsWith('image/') || +input.size>5242880)
//     if(input === undefined || +input.size>5242880)
//         return true;
//     return false;
// }

const email = (input: string) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex))
        return true;
    else
        return false;
}

const password = (input: string) => {
    if (input.trim().length>=6)
        return true;
    else
        return false;
}

// module.exports.phone = (input: string) => {
//     var validRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
//     if (input.match(validRegex))
//         return false;
//     else
//         return true;
// }

export default {
    email,
    password,
    text,
    number,
}