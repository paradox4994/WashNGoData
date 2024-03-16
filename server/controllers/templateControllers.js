

const templates = (req, res) => {
    const test = [{"name": "Template 1", "date": "10/10/3014"},{"name": "Template 2", "date": "99/99/9999"}]
    res.json(test)
}

module.exports = {
    templates
}