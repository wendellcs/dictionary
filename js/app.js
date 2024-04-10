// Form elements
const formElements = {
    form: document.querySelector('.form'),
    formInput: document.querySelector('.form-box-word'),
    send: document.querySelector('.btn.send'),
}

const otherHTMLElements = {
    containerResults: document.querySelector('.container-results')
}


const dictionary = new DictionaryAPI()

const wordServices = new WordServices()
const renderView = new RenderView(otherHTMLElements.containerResults)
const wordController = new WordController(wordServices, renderView)

formElements.form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const _word = formElements.formInput.value

    try {
        const data = await dictionary.getWord(_word)

        console.log(data)
        const word = new WordModel(data)
        wordController.addWord(word)

    } catch (err) {
        alert(err.message)
    }

})


