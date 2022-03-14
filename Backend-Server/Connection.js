const { MongoClient } = require('mongodb')

class Connection {

    constructor(_config, _logger) {
        this.config = _config;
        this.logger = _logger;
        this.db = null;
        this.client = null;
    }

    async connectDb() {
        try {
            let authString = "";
            if (this.config.mongoDBUserName != "") {
                authString = encodeURIComponent(this.config.mongoDBUserName) + ":" + encodeURIComponent(this.config.mongoDBPassword) + "@"
            }
            let url = "mongodb://" + authString + this.config.mongoIP + ":27017/" + this.config.mongoDBName;

            this.client = new MongoClient(url, { useUnifiedTopology: true })
            await this.client.connect()
            this.db = this.client.db(this.config.mongoDBName)
            this.logger.info("Successfully connected to MongoClient")
        } catch (err) {
            this.logger.error("Failed connected to MongoClient", err)
        }

    }
}

module.exports = Connection;