class WordServices {
    constructor(word) {
        if (!word instanceof WordModel) throw TypeError("word must be an instance of WordModel");

        this.wordList = []
    }

    addWord(word) {
        this.wordList.push(word);
    }
}