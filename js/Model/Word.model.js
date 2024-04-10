class WordModel {
    constructor({ word, definitions, wordClasses }) {
        if (!word || !definitions || !wordClasses) {
            throw new Error('word, definitions and meaning are required')
        }

        this.word = word;
        this.definitions = definitions;
        this.wordClasses = wordClasses;
    }
}
