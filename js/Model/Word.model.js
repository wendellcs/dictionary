class WordModel {
    constructor({ word, definitionsByWordClass, phonetic, phoneticAudios }) {
        if (!word || !definitionsByWordClass || !phonetic || !phoneticAudios) {
            throw new Error('These datas are required')
        }

        this.word = word;
        this.definitionsByWordClass = definitionsByWordClass;
        this.phonetic = phonetic;
        this.phoneticAudios = phoneticAudios;
    }
}
