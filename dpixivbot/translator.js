const translations = require("./translations.json")

module.exports = (word, lang) => {
    return translations[word] && translations[word][lang] || "..."
}