
// https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/quick-start

const needle = require('needle');
const { check, validationResult } = require('express-validator');


const token = 'AAAAAAAAAAAAAAAAAAAAAMTSaAEAAAAAXxyk8NUypRLHiKdSVaMJyxSU4dE%3D9VI4MnacaVGKlU79BeNuvqeQmUZReGPh8ivdPAdA03eDAPnSs8'

const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL = 'https://api.twitter.com/2/tweets/search/stream';
const streamFullURL = 'https://api.twitter.com/2/tweets/search/stream?tweet.fields=lang&expansions=attachments.media_keys&media.fields=preview_image_url,url';
//https://api.twitter.com/2/users/2244994945/tweets?tweet.fields=created_at&max_results=100&start_time=2019-01-01T17:00:00Z&end_time=2020-12-12T01:00:00Z
//https://api.twitter.com/2/tweets?ids=1204084171334832128&tweet.fields=public_metrics&expansions=attachments.media_keys&media.fields=public_metrics  

class Twitter {
    constructor(logger, config, connection, app) {
        this.logger = logger;
        this.config = config;
        this.connection = connection;
        this.app = app;
        this.isStreamActive = false
    }

    intiAPIs() {
        this.app.post(
            '/Twitter/All',
            this.searchTwitter.bind(this)
        );
        this.app.post(
            '/Twitter/LoadMore',
            this.loadMore.bind(this)
        );
        this.app.post(
            '/Twitter/count',
            this.count.bind(this)
        );
    }

    async init() {
        this.intiAPIs();
        await this.checkAndAddDefaultUser();
    }
    async checkAndAddDefaultUser() {
        try {
            const { email, password } = this.config.defaultUser
            const collectionName = "Users";
            const usersCollection = this.connection.db.collection(collectionName);

            const userCount = await usersCollection.find({}).count();

            if (userCount === 0) {
                await usersCollection.insertOne({
                    email,
                    firstname: "admin",
                    lastname: "user",
                    permissions: ["ALL"],
                    password,
                    userType: "Admin"
                });
            }
        } catch (error) {
            this.logger.error("Failed while checking and adding default user " + error);
        }
    }


    async getAllRules() {

        const response = await needle('get', rulesURL, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        if (response.statusCode !== 200) {
            console.log("Error:", response.statusMessage, response.statusCode)
            throw new Error(response.body);
        }

        return (response.body);
    }

    async deleteAllRules(rules) {

        if (!Array.isArray(rules.data)) {
            return null;
        }

        const ids = rules.data.map(rule => rule.id);

        const data = {
            "delete": {
                "ids": ids
            }
        }

        const response = await needle('post', rulesURL, data, {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })

        if (response.statusCode !== 200) {
            throw new Error(response.body);
        }

        return (response.body);

    }

    async setRules(rules) {

        const data = {
            "add": rules
        }

        const response = await needle('post', rulesURL, data, {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })

        if (response.statusCode !== 201) {
            throw new Error(response.body);
        }

        return (response.body);

    }
    async streamConnect1(retryAttempt) {
        const collectionName = "Twitter";
        const twitterCollection = this.connection.db.collection(collectionName);
        let token = this.config.Token
        const streamforfullTwitter = needle.get(streamFullURL, {
            headers: {
                "User-Agent": "v2FilterStreamJS",
                "Authorization": `Bearer ${token}`
            },
            timeout: 20000
        });

        streamforfullTwitter.on('data', async (data) => {
            try {
                if (!this.isStreamActive) {
                    this.isStreamActive = true
                }

                const json = JSON.parse(data);
                await twitterCollection.insertOne(json);

                console.log(json);

                retryAttempt = 0;
            } catch (e) {
                if (data.detail === "This streamforfullTwitter is currently at the maximum allowed connection limit.") {
                    console.log(data.detail)
                    this.isStreamActive = false
                    return
                } else {

                }
            }
        }).on('err', error => {
            if (error.code !== 'ECONNRESET') {
                console.log(error.code);
                this.isStreamActive = false
                return
            } else {

                setTimeout(() => {
                    console.warn("A connection error occurred. Reconnecting...")
                    streamConnect(++retryAttempt);
                }, 2 ** retryAttempt)
            }
        });

        return streamforfullTwitter;
    }

    async streamConnect(retryAttempt) {

        const collectionName = "Twitter";
        const twitterCollection = this.connection.db.collection(collectionName);

        let token = this.config.Token
        const stream = needle.get(streamURL, {
            headers: {
                "User-Agent": "v2FilterStreamJS",
                "Authorization": `Bearer ${token}`
            },
            timeout: 20000
        });

        stream.on('data', async (data) => {
            try {
                if (!this.isStreamActive) {
                    this.isStreamActive = true
                }

                const json = JSON.parse(data);
                await twitterCollection.insertOne(json);

                console.log(json);

                retryAttempt = 0;
            } catch (e) {
                if (data.detail === "This stream is currently at the maximum allowed connection limit.") {
                    console.log(data.detail)
                    this.isStreamActive = false
                    return
                } else {

                }
            }
        }).on('err', error => {
            if (error.code !== 'ECONNRESET') {
                console.log(error.code);
                this.isStreamActive = false
                return
            } else {

                setTimeout(() => {
                    console.warn("A streamforfullTwitter connection error occurred. Reconnecting...")
                    streamConnect(++retryAttempt);
                }, 2 ** retryAttempt)
            }
        });


        return stream;

    }

    async startStreaming(rules) {
        let currentRules;
        // let rules = [{
        //     'value': 'dog has:images -is:retweet',
        //     'tag': 'dog pictures'
        // },
        // {
        //     'value': 'cat has:images -grumpy',
        //     'tag': 'cat pictures'
        // },
        // ];

        try {

            currentRules = await this.getAllRules();

            await this.deleteAllRules(currentRules);

            await this.setRules(rules);

        } catch (e) {
            console.error("startStreaming......", e);
            process.exit(1);
        }

        this.streamConnect(0);
    }

    async searchTwitter(req, res) {
        try {
            this.logger.debug("req for search Twitter ...." + req.body)
            let { limit = 25, page = 0, rules } = req.body;
            await check("rules", `Please provide a "rules"`)
                .not()
                .isEmpty()
                .run(req);
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                const [error] = errors.array();
                return res.send({
                    status: false,
                    message: error.msg
                })
            }
            const collectionName = "Twitter";
            const twitterCollection = this.connection.db.collection(collectionName);
            await twitterCollection.remove()
            await this.startStreaming(rules)
            // this.streamConnect1(rules)
            console.log("startStreaming....")
            res.send({
                status: true,
                tweets: 0,
                totalCount: 0
            });



        } catch (error) {
            console.log("error....", error)
            res.send({
                status: false,
                massage: "Something went Wrong! Retry.. "
            });
        }
    }
    async loadMore(req, res) {


        try {

            this.logger.debug("req for load More Twitter ...." + req.body)
            const { limit = 25, page = 0 } = req.body;

            const collectionName = "Twitter";
            const twitterCollection = this.connection.db.collection(collectionName);
            const [tweets, totalCount] = await Promise.all([
                twitterCollection.find({})
                    .skip(Number(page) * Number(limit))
                    .limit(Number(limit))
                    .toArray(),
                twitterCollection.find({}).count()
            ]);


            res.send({
                status: true,
                tweets,
                totalCount
            });

        } catch (error) {
            res.send({
                status: false,
                massage: "Something went Wrong! Retry.. "
            });
        }


    }
    async count(req, res) {


        try {

            this.logger.debug("req for Twitter counter...." + req.body)
            const { limit = 25, page = 0 } = req.body;

            const collectionName = "Twitter";
            const twitterCollection = this.connection.db.collection(collectionName);

            let totalCount = await twitterCollection.find({}).count()
            let notification = 0
            if (totalCount > limit && page > 0) {
                notification = totalCount - (limit * page)
            }


            res.send({
                status: true,
                notification: notification,
                totalCount
            });

        } catch (error) {
            this.logger.debug("req for Twitter counter.... error" + JSON.stringify(error))
            res.send({
                status: false,
                massage: "Something went Wrong! Retry.. "
            });
        }


    }

}
module.exports = Twitter;