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
    }
}