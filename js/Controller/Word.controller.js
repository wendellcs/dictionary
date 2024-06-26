class WordController {
    constructor(service, view) {
        this.service = service
        this.view = view

        this.getWordListFromLocalStorage()
    }

    /**
        * Adds a word to the word list, renders the list in the view, 
        * and saves the word to localStorage.
        * @param {WordModel} word - The word to be added to the list.
    */
    addWord(word) {
        if (!(word instanceof WordModel)) throw TypeError("Word must be an instance of WordModel")

        this.service.addWord(word)
        this.view.renderWords(this.service.wordList)
        this.saveWordListToLocalStorage(word)
    }
    /*
        * Updates the list with more definitions when the user clicks on the 
        * "show more" button.
    */
    showMore() {
        this.view.showMore()
    }

    // Renders the history
    renderHistory() {
        if (this.service.wordList.length > 0) {
            this.view.renderHistory(this.service.wordList)
        }
    }

    // Clears the word list, updates the view, and clears the localStorage.
    clearHistory() {
        this.service.wordList = []
        this.view.renderHistory(this.service.wordList)

        this.service.clearLocalStorage()
    }

    /*
        * Deletes the chosen word from the history, updates the view, and deletes 
        * the word from localStorage. 
    */
    removeHistoryItem(itemId) {
        this.service.wordList.splice(itemId, 1)
        this.view.renderHistory(this.service.wordList)

        this.saveWordListToLocalStorage(this.service.wordList)
    }
    /** 
        * Renders the definitions and examples of the chosen word when clicked 
        * in the history.
        * @param {WordModel} _word - Word to be rendered.
    */
    renderWordFromHistory(_word) {
        const toBeRendered = this.service.wordList.find(w => w.word === _word)
        this.view.renderWords(Array(toBeRendered))
    }

    /*
        * Retrieves the list of words saved in localStorage, transforms each word 
        * into a WordModel instance, and updates the history view with the new word list.
    */
    getWordListFromLocalStorage() {
        const toBeRendered = this.service.getWordListFromLocalStorage()
        if (toBeRendered) {
            toBeRendered.map((item) => {
                this.service.addWord(new WordModel(item))
            })

            this.view.renderHistory(this.service.wordList)
        }
    }

    // Saves the word list to localStorage.
    saveWordListToLocalStorage() {
        const toSave = [...this.service.wordList]
        this.service.saveWordListToLocalStorage(toSave)
    }

    renderExamples(_word) {
        if (_word) {
            this.view.renderExamples(_word, this.service.wordList)
        }
    }
}