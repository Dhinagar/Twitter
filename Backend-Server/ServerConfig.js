const fs = require('fs');

class ServerConfig {
    constructor() {
        this.config = {};
    }

    loadConfig(filename) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, "utf8", (error, data) => {
                if (error) {
                    this.config = {};
                    reject(error)
                } else {
                    this.config = JSON.parse(data);
                    resolve()
                }

            })
        })

    }

    get isHttps() {
        return "isHttps" in this.config ? this.config.isHttps : false;
    }

    get serverPort() {
        return "serverPort" in this.config ? this.config.serverPort : 3000;
    }

    get mongoDBUserName() {
        return "mongoDBUserName" in this.config ? this.config.mongoDBUserName : ""
    }
    get mongoDBPassword() {
        return "mongoDBPassword" in this.config ? this.config.mongoDBPassword : ""
    }
    get mongoIP() {
        return "mongoIP" in this.config ? this.config.mongoIP : ""
    }
    get mongoDBName() {
        return "mongoDBName" in this.config ? this.config.mongoDBName : ""
    }

    get JWTSecret() {
        return "JWT_Secret" in this.config ? this.config.JWT_Secret : "";
    }
    get Token() {
        return "Token" in this.config ? this.config.Token : "";
    }


    get defaultUser() {
        if (!("default_user" in this.config)) throw new Error(`"default_user" is not in config.txt`);
        return this.config.default_user;
    }

    get auth() {
        return "auth" in this.config ? this.config.auth : {};
    }

}

module.exports = ServerConfig;