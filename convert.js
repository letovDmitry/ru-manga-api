const RU_ALPH = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    0: '0',
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'j',
    з: 'z',
    и: 'i',
    й: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'ch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'iu',
    я: 'ia',
    ' ': '_',
    '-': '_',
    '—': '_',
    ',': '_',
    '~': '_'
}

module.exports = {
    convert: (word) => {
        const wordArr = word.toLowerCase().split('')
        const wordArrNew = wordArr.map(l => RU_ALPH[l])
    
        return wordArrNew.join('')
    }
}