class DictionaryAPI {
    async getWord(word) {
        if (!word) throw new Error('Please, insert a valid word')

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            const data = response.data

            const meanings = data[0].meanings
            const definitionsSynonymsAntonyms = meanings.map(meaning => meaning.definitions)
            const wordClasses = meanings.map(mean => mean.partOfSpeech)

            const definitions = this.removeSynonymsAndAntonyms(definitionsSynonymsAntonyms)
            const examples = this.getExamples(definitions)

            const results = {
                word,
                wordClasses,
                definitions,
                examples
            }

            return results
        } catch (err) {
            return null
        }
    }

    removeSynonymsAndAntonyms(definitions) {
        definitions.map(def => {
            for (let i = 0; i < def.length; i++) {

                delete def[i].synonyms
                delete def[i].antonyms
            }
        })

        return definitions
    }

    getExamples(definitions) {
        const results = []
        definitions.map(def => {
            const classExamples = []
            for (let i = 0; i < def.length; i++) {
                if (def[i].example) {
                    def[i].example
                    classExamples.push(def[i].example)
                }
            }
            results.push(classExamples)
        })
        return results
    }
}

/* Criar um texto escrito loading quando algo estiver carregando ( Ser mais criativo que isso) */