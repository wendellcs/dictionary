class RenderView {
    constructor(containerResults) {
        if (!containerResults) {
            throw new Error('A results container is needed');
        }

        this.containerResults = containerResults;
        this.toBeRendered = 5
    }

    renderWords(words) {
        this.toBeRendered = 5

        if (words && words.length > 0) {
            const index = words.length - 1;
            this.containerResults.classList.remove('hidden')

            // Get important HTML elements
            const title = this.containerResults.querySelector('.title')
            const select = this.containerResults.querySelector('.container-results-select')
            const spanPhonetic = this.containerResults.querySelector('.phonetic')

            this.words = words
            this.select = select
            this.index = index

            select.textContent = ''

            // Get all word classes based on the chosen word
            const classes = []
            for (let wc in words[index].definitionsByWordClass) {
                classes.push(wc)
            }

            spanPhonetic.textContent = words[index].phonetic

            // Update the title
            title.textContent = words[index].word

            // Create the options based on the word classes of the chosen word.
            classes.forEach((_class) => {
                const option = document.createElement('option');
                option.value = _class;
                option.innerText = _class;
                option.className = 'option'
                select.appendChild(option);
            })

            // Update the definitions once the user has chosen a different word class
            select.addEventListener('change', () => {
                this.toBeRendered = 5
                this.updateDefinitions()
            })
            this.updateDefinitions()
        }
    }

    updateDefinitions() {
        const _class = this.select.value

        const toBeRenderedDefinition = this.words[this.index].definitionsByWordClass[_class]
        this.renderDefinitions(toBeRenderedDefinition)
    }

    renderDefinitions(definitionsList) {
        const btnShowMore = this.containerResults.querySelector('.btn.show-more')
        const results = this.containerResults.querySelector('.select-results')
        results.textContent = ''

        if (definitionsList.length > 5) {
            btnShowMore.classList.remove('hidden')
        }

        for (let i = 0; i < this.toBeRendered; i++) {
            if (definitionsList[i]) {
                const p = document.createElement('p')
                p.className = 'definition'
                p.textContent = definitionsList[i]
                results.appendChild(p)
            } else {
                btnShowMore.classList.add('hidden')
                break
            }
        }
    }

    showMore() {
        this.toBeRendered += 5
        this.updateDefinitions()
    }

    toggleHistoryMenuVisibility() {
        const containerHistory = document.querySelector('.container-history')
        const history = document.querySelector('.history')
        containerHistory.classList.toggle('open')
        history.classList.toggle('open')
    }

    renderHistory(words) {
        const history = document.querySelector('.history-items')
        history.textContent = ''

        if (words && words.length > 0) {
            words.forEach((word, i) => {
                const historyItemBox = document.createElement('div')
                historyItemBox.className = 'history-word-box'
                historyItemBox.setAttribute('history-id', i)

                const historyItem = document.createElement('p')
                historyItem.className = 'history-word-box-item'
                historyItem.textContent = word.word

                historyItemBox.appendChild(historyItem)

                const icon = document.createElement('span')
                icon.innerHTML = '<ion-icon name="trash-outline" class="trash"></ion-icon>'

                historyItemBox.appendChild(icon)
                history.appendChild(historyItemBox)
            })
        } else {
            history.textContent = 'So empty...'
        }
    }

    renderExamples(word, examples) {
        const container = this.containerResults.querySelector('.select-results')
        container.textContent = ''

        const text = document.createElement('h2')
        text.textContent = 'Here are some examples'
        text.className = 'text-examples'
        container.appendChild(text)

        examples.forEach((ex, i) => {
            const p = document.createElement('p')
            p.className = 'example'
            p.textContent = ex
            container.appendChild(p)
        })
    }
}
