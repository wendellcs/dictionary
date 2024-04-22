class WordServices {
    constructor(word) {
        this.wordList = []
    }

    addWord(word) {
        this.wordList.push(word);
    }

    saveWordListToLocalStorage(items) {
        localStorage.setItem('wordList', JSON.stringify(items))
    }

    getWordListFromLocalStorage() {
        return JSON.parse(localStorage.getItem('wordList'))
    }

    clearLocalStorage() {
        localStorage.removeItem('wordList')
    }
}