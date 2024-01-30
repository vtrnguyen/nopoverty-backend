
let getHomePage = (req, res) => {
    return res.send('Home page');
}

let getAboutPage = (req, res) => {
    return res.send('About page');
}

module.exports = {
    getHomePage, getAboutPage
}