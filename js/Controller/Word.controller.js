class WordController {
    constructor(service, view) {
        view.renderWords(service.wordList)
        this.service = service
        this.view = view
    }

    addWord(word) {
        if (!word instanceof WordModel) throw TypeError("Word must be an instance of WordModel")

        this.service.addWord(word)
        this.view.renderWords(this.service.wordList)
        this.renderHistory()
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
}