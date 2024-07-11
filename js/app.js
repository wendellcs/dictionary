// HTML ELEMENTS
const formElements = {
    form: document.querySelector('.form'),
    formInput: document.querySelector('.form-box-word'),
}

const containers = {
    containerHistory: document.querySelector('.container-history'),
    containerResults: document.querySelector('.container-results')
}

const otherHTMLElements = {
    popUp: document.querySelector('.container-popup'),
    history: document.querySelector('.history')
}

const buttons = {
    btnShowMore: document.querySelector('.btn.show-more'),
    btnClosePopup: document.querySelector('.btn.close-popup'),
    btnOpenHistory: document.querySelector('.open-history'),
    btnClearHistory: document.querySelector('.btn.clear-history'),
}

// API
const dictionary = new DictionaryAPI()

// MVC IMPORTS
const wordServices = new WordServices()
const renderView = new RenderView(containers.containerResults)
const wordController = new WordController(wordServices, renderView)

formElements.form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const _word = formElements.formInput.value.trim().toLowerCase()

    if (!_word) {
        otherHTMLElements.popUp.classList.remove('hidden')
        return
    }

    otherHTMLElements.popUp.classList.add('hidden')

    try {
        const data = await dictionary.getWord(_word)

        const word = new WordModel(data)
        wordController.addWord(word)

        formElements.formInput.value = ''

    } catch (err) {
        alert(err.message)
    }
})

buttons.btnClosePopup.addEventListener('click', () => otherHTMLElements.popUp.classList.add('hidden'))

buttons.btnShowMore.addEventListener('click', () => {
    wordController.showMore()
})

buttons.btnOpenHistory.addEventListener('click', () => {
    renderView.toggleHistoryMenuVisibility()
})

buttons.btnClearHistory.addEventListener('click', () => {
    wordController.clearHistory()
})

otherHTMLElements.history.addEventListener('click', e => {
    if (e.target.classList.contains('trash')) {
        const parent = e.target.closest('.history-word-box')
        wordController.removeHistoryItem(parent.getAttribute('history-id'))
    }

    if (e.target.classList.contains('history-word-box-item')) {
        const word = e.target.textContent
        wordController.renderWordFromHistory(word)
    }
})

containers.containerResults.addEventListener('click', e => {
    if (e.target.classList.contains('cta-examples')) {
        const word = containers.containerResults.querySelector('.title').textContent
        const wordClass = containers.containerResults.querySelector('.container-results-select').value
        wordController.renderExamples(word, wordClass)
    }
})

