class WordModel {
    constructor({ word, definitionsByWordClass }) {
        if (!word || !definitionsByWordClass) {
            throw new Error('These datas are required')
        }

        this.word = word;
        this.definitionsByWordClass = definitionsByWordClass;
    }
}
