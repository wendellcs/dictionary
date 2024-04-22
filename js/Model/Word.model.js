class WordModel {
    constructor({ word, definitions, wordClasses, examples }) {
        if (!word || !definitions || !wordClasses || !examples) {
            throw new Error('word, definitions, meaning and examples are required')
        }

        this.word = word;
        this.definitions = definitions;
        this.wordClasses = wordClasses;
        this.examples = examples;
    }
}
