class RenderView {
    constructor(containerResults) {
        if (!containerResults) {
            throw new Error('A results container is needed');
        }

        this.containerResults = containerResults;

    }

    renderWords(words) {
        if (words.length > 0) {
            const index = words.length - 1;
            // this.containerResults.innerHTML = '';

            this.containerResults.classList.remove('hidden')
            const title = this.containerResults.querySelector('.title')
            const select = this.containerResults.querySelector('.container-results-select')
            const wordClass = this.containerResults.querySelector('.word-class')



            this.words = words
            this.select = select
            this.index = index

            select.textContent = ''
            const classes = words[index].wordClasses.map((_class) => _class)
            title.textContent = words[index].word
            // Remove any repeated word
            const toBeRenderedClasses = classes.filter((_class, i) => {
                return classes.indexOf(_class) === i
            })

            // Create the options based on the word classes of the chosen word.
            toBeRenderedClasses.forEach((_class) => {
                if (!select.querySelector(`option.${_class}`)) {
                    const option = document.createElement('option');
                    option.value = _class;
                    option.innerText = _class;
                    option.className = 'option'
                    select.appendChild(option);
                }
            })

            // Update the definitions based on the selected word
            select.addEventListener('change', () => {
                wordClass.textContent = select.value
                this.loadDefinitions()
            })

            this.loadDefinitions()
        }
    }

    loadDefinitions() {
        const results = this.containerResults.querySelector('.select-results')
        const _class = this.select.value
        const wordClassIndex = []

        this.words[this.index].wordClasses.forEach((_wordClass, i) => {
            if (_wordClass == _class) {
                wordClassIndex.push(i)
            }
        })

        // Verify whether there are multiple definitions for the same word
        if (wordClassIndex.length > 1) {
            results.textContent = ''
            const multipleResults = []

            wordClassIndex.forEach(i => {
                multipleResults.push(this.words[this.index].definitions[i])
            })

            multipleResults.forEach(result => {
                result.forEach(def => {
                    const p = document.createElement('p')
                    p.className = 'definition'
                    p.textContent = def.definition
                    results.appendChild(p)
                })
            })
        } else {
            results.textContent = ''
            const toBeRenderedDefinition = this.words[this.index].definitions[wordClassIndex]

            toBeRenderedDefinition.forEach(definition => {
                const p = document.createElement('p')
                p.className = 'definition'
                p.textContent = definition.definition
                results.appendChild(p)
            })
        }

    }
}
