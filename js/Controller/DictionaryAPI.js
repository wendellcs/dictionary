class DictionaryAPI {
    async getWord(word) {
        if (!word) throw new Error('Plesa, insert a valid word')

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            const data = response.data

            const meanings = data[0].meanings
            const definitions = meanings.map(meaning => meaning.definitions)
            const wordClasses = meanings.map(mean => mean.partOfSpeech)

            const results = {
                word,
                wordClasses,
                definitions
            }

            return results
        } catch (err) {
            return null
        }
    }
}

/* Criar um texto escrito loading quando algo estiver carregando ( Ser mais criativo que isso) */