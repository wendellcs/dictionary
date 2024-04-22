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

        if (words.length > 0) {

            const index = words.length - 1;
            this.containerResults.classList.remove('hidden')

            // Get important HTML elements
            const title = this.containerResults.querySelector('.title')
            const select = this.containerResults.querySelector('.container-results-select')
            const wordClass = this.containerResults.querySelector('.word-class')

            this.words = words
            this.select = select
            this.index = index

            select.textContent = ''
            // Get all word classes based on the chosen word
            const classes = words[index].wordClasses.map((_class) => _class)
            // Update the title
            title.textContent = words[index].word

            // Remove any repeated word class
            const toBeRenderedClasses = classes.filter((_class, i) => {
                return classes.indexOf(_class) === i
            })

            // Create the options based on the word classes of the chosen word.
            toBeRenderedClasses.forEach((_class) => {
                const option = document.createElement('option');
                option.value = _class;
                option.innerText = _class;
                option.className = 'option'
                select.appendChild(option);
            })

            // Update the definitions once the user has chosen a different word class
            select.addEventListener('change', () => {
                wordClass.textContent = select.value
                this.toBeRendered = 5
                this.getDefinitionsReadyToBeRendered()
            })
            this.getDefinitionsReadyToBeRendered()
        }
    }

    getDefinitionsReadyToBeRendered() {
        const _class = this.select.value
        const wordClassIndex = []

        // Get the indexes where the words are repeated
        this.words[this.index].wordClasses.forEach((_wordClass, i) => {
            if (_wordClass == _class) {
                wordClassIndex.push(i)
            }
        })

        // Verify whether there are multiple definitions for the same word
        if (wordClassIndex.length > 1) {
            const multipleResults = []

            // Insert the repeated definitions into the same array
            wordClassIndex.forEach(i => {
                multipleResults.push(this.words[this.index].definitions[i])
            })

            // Make an unique array from the multipleResults array
            const rendering = []
            multipleResults.map(obj => { obj.map(def => { rendering.push(def) }) })

            this.renderDefinitions(rendering)
        } else {
            const toBeRenderedDefinition = this.words[this.index].definitions[wordClassIndex]

            this.renderDefinitions(toBeRenderedDefinition)
        }
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
                p.textContent = definitionsList[i].definition
                results.appendChild(p)
            } else {
                btnShowMore.classList.add('hidden')
                break
            }
        }
    }

    showMore() {
        this.toBeRendered += 5
        this.getDefinitionsReadyToBeRendered()
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
}
