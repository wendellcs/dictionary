class DictionaryAPI {
    async getWord(word) {
        if (!word) throw new Error('Please, insert a valid word')

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            const data = response.data[0]

            const meanings = data.meanings;
            const wordDefinitions = {};

            const examples = {}

            meanings.forEach(meaning => {
                const wordClass = meaning.partOfSpeech;
                const definitions = meaning.definitions.map(definition => definition.definition);

                const wordExamples = meaning.definitions.filter(definition => definition.example !== undefined).map((definition) => definition.example)

                if (!examples[wordClass]) {
                    examples[wordClass] = []
                }

                if (wordExamples) {
                    examples[wordClass].push(...wordExamples)
                }

                if (!wordDefinitions[wordClass]) {
                    wordDefinitions[wordClass] = [];
                }

                wordDefinitions[wordClass].push(...definitions);
            })

            const phonetic = data.phonetic;
            const phoneticAudios = data.phonetics;

            const results = {
                word,
                definitionsByWordClass: wordDefinitions,
                examples,
                // phonetic,
                // phoneticAudios,
            }

            return results;

        } catch (err) {
            return null;
        }
    }
}