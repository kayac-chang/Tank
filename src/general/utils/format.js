import numeral from 'numeral';

export function currencyFormat(num) {
    return numeral(num).format('$0,0');
}

export function toValue(num) {
    return numeral(num).value();
}

export function signFormat(num) {
    return numeral(num).format('+0,0');
}

export function kFormat(num) {
    return numeral(num).format('0a');
}

export function kCurrencyFormat(num) {
    return numeral(num).format('$0a');
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
