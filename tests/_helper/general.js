let fn = {};

fn.getRandomAlphabet = (a) => {
    let text = '';
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < a; i++) {
        text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return text;
};

fn.getRandomInt = (a) => {
    let text = '';
    let number = '0123456789';

    for (let i = 0; i < a; i++) {
        text += number.charAt(Math.floor(Math.random() * number.length));
    }

    return text;
};

fn.removeCurrency = (text) => {
    text = text.replace(/\./gi, '').replace(/rp/gi, '').replace(' ', '').replace('- ', '-');

    return text;
};

module.exports = fn;