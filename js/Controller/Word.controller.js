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

    toggleHistoryMenuVisibility(menu) {
        if (!menu) throw new Error('The history menu is needed')
        this.view.toggleHistoryMenuVisibility(menu)
    }

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

    saveWordListToLocalStorage() {
        const toSave = [...this.service.wordList]
        this.service.saveWordListToLocalStorage(toSave)
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
}