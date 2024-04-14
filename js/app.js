// Form elements
const formElements = {
    form: document.querySelector('.form'),
    formInput: document.querySelector('.form-box-word'),
    send: document.querySelector('.btn.send'),
}

const otherHTMLElements = {
    containerResults: document.querySelector('.container-results'),
    btnShowMore: document.querySelector('.btn.show-more'),
    openHistory: document.querySelector('.open-history')
}


const dictionary = new DictionaryAPI()

const wordServices = new WordServices()
const renderView = new RenderView(otherHTMLElements.containerResults)
const wordController = new WordController(wordServices, renderView)

formElements.form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const _word = formElements.formInput.value.trim().toLowerCase()

    try {
        const data = await dictionary.getWord(_word)

        const word = new WordModel(data)
        wordController.addWord(word)

    } catch (err) {
        alert(err.message)
    }
})

otherHTMLElements.btnShowMore.addEventListener('click', () => {
    wordController.showMore()
})

otherHTMLElements.openHistory.addEventListener('click', () => {
    wordController.toggleHistoryMenuVisibility(document.querySelector('.container-history'))
})


