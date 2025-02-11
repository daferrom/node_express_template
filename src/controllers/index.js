class IndexController {
    handleGetRequest(req, res) {
        res.send("GET request handled");
    }

    handlePostRequest(req, res) {
        res.send("POST request handled");
    }

    // Additional methods for other HTTP methods can be added here
}

module.exports = IndexController;