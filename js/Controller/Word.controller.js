class WordController {
    constructor(service, view) {
        view.renderWords(service.wordList)
        this.service = service
        this.view = view

        this.getWordListFromLocalStorage()
    }

    addWord(word) {
        if (!(word instanceof WordModel)) throw TypeError("Word must be an instance of WordModel")

        this.service.addWord(word)
        this.view.renderWords(this.service.wordList)
        this.renderHistory()
        this.saveWordListToLocalStorage(word)
    }

    showMore() {
        this.view.showMore()
    }

    // History

    renderHistory() {
        if (this.service.wordList.length > 0) {
            this.view.renderHistory(this.service.wordList)
        }
    }

    clearHistory() {
        this.service.wordList = []
        this.view.renderHistory(this.service.wordList)

        this.service.clearLocalStorage()
    }

    removeHistoryItem(itemId) {
        this.service.wordList.splice(itemId, 1)
        this.view.renderHistory(this.service.wordList)

        this.saveWordListToLocalStorage(this.service.wordList)
    }

    renderWordFromHistory(_word) {
        const toBeRendered = this.service.wordList.find(w => w.word === _word)
        this.view.renderWords(Array(toBeRendered))
    }

    // LocalStorage

    saveWordListToLocalStorage() {
        const uniqueWords = new Set(this.service.wordList.map(w => w.word))
        const toSaveUnique = []

        for (let item of uniqueWords) {
            toSaveUnique.push(this.service.wordList.find(w => w.word === item))
        }

        this.service.saveWordListToLocalStorage(toSaveUnique)
    }

    getWordListFromLocalStorage() {
        const toBeRendered = this.service.getWordListFromLocalStorage()
        if (toBeRendered) {
            toBeRendered.map((item) => {
                this.service.addWord(new WordModel(item))
            })

            this.view.renderHistory(this.service.wordList)
        }
    }

    // Examples

    renderExamples(_word, _wordClass) {
        if (_word && _wordClass) {
            const baseWord = this.service.wordList.find(w => w.word == _word)
            const examplesToBeRendered = baseWord.examples[_wordClass]

            if (examplesToBeRendered.length > 0) {
                this.view.renderExamples(examplesToBeRendered)
            }
        }
    }
}