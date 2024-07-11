class WordModel {
    constructor({ word, definitionsByWordClass, examples }) {
        if (!word || !definitionsByWordClass) {
            throw new Error('These datas are required')
        }

        this.word = word;
        this.definitionsByWordClass = definitionsByWordClass;

        if (examples) {
            this.examples = examples
        }

    }
}
