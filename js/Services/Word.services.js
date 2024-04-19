class WordServices {
    constructor(word) {
        if (!word instanceof WordModel) throw TypeError("word must be an instance of WordModel");

        this.wordList = []
    }

    addWord(word) {
        this.wordList.push(word);
    }

    saveToLocalStorage(items) {
        localStorage.setItem('wordList', JSON.stringify(items))
    }

    getSavedItemsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('wordList'))
    }
}