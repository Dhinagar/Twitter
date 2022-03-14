
//const { TwitterClient } = require('twitter-api-client')
const Twitter = require('twitter-v2');
const { default: async } = require('async');
const BearerToken = 'AAAAAAAAAAAAAAAAAAAAABSaaAEAAAAAusNqfx9JC3Wlzh4bvKHEfZ76aEQ%3DhvyrO1DavJumLrfJoDKJ1CdS1g3NIIP77U3GemZaWhdO9P4qt6'
// const twitterClient = new TwitterClient({
//     apiKey: 'O03of19VVhKShCXxQxUizPXkI',
//     apiSecret: 'wuuWGt4RFU9Tl4GEHjWJHtn3CHwmTXtBFkpKJfvHVM2kM2eLhP',
//     accessToken: '1364620371945791491-kwYZKztqB7FUnsKUIGfu9IME8MWIqT',
//     accessTokenSecret: 'Ct3WksHly2BqMeA6LX5ygzVZpqhPfJRXQomN3lKHghO6x'
// });

var client = new Twitter({
    consumer_key: 'O03of19VVhKShCXxQxUizPXkI',
    consumer_secret: 'wuuWGt4RFU9Tl4GEHjWJHtn3CHwmTXtBFkpKJfvHVM2kM2eLhP',
    access_token_key: '1364620371945791491-kwYZKztqB7FUnsKUIGfu9IME8MWIqT',
    access_token_secret: 'Ct3WksHly2BqMeA6LX5ygzVZpqhPfJRXQomN3lKHghO6x'
});

// var client = new Twitter({
//     consumer_key: 'O03of19VVhKShCXxQxUizPXkI',
//     consumer_secret: 'wuuWGt4RFU9Tl4GEHjWJHtn3CHwmTXtBFkpKJfvHVM2kM2eLhP',
//     bearer_token: 'AAAAAAAAAAAAAAAAAAAAABSaaAEAAAAAXzZ6naF%2BbmXQhoXIq86xmTMoI%2F8%3DwmgWOKMEgELHzRyy09K6O55FcM4VLCS6vArjm8UKhEy1Ph2zN5'
// });

const usersSearch = async () => {
    try {


        client.stream('statuses/filter', { track: 'javascript' }, function (stream) {
            stream.on('data', function (event) {
                console.log(event && event.text);
            });

            stream.on('error', function (error) {
                console.log("client.....", error)
                throw error;
            });
        });
    } catch (error) {
        console.log("catch.....", error)
    }

}

const basictest = async () => {

    try {
        const { data } = await client.get('tweets', { ids: '1228393702244134912' });
        console.log(data);
    } catch (error) {
        console.log("data.......error", error)
    }

}

console.log("data   userserach........", usersSearch())

// parameswaran marimuthu9: 02 PM
// https://github.com/HunterLarco/twitter-v2
// parameswaran marimuthu9: 14 PM
// https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/main/Sampled-Stream/sampled_stream.js
// https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/main/Filtered-Stream/filtered_stream.js
// parameswaran marimuthu9: 34 PM
// https://developer.twitter.com/en/docs/twitter-api/pagination
// parameswaran marimuthu9: 42 PM
// https://developer.twitter.com/en/docs/twitter-api/pagination
// parameswaran marimuthu10: 06 PM
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/paginate
// parameswaran marimuthu10: 37 PM
// https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/get-tweets-search-stream
// parameswaran marimuthu10: 43 PM
// https://blog.logrocket.com/scale-node-js-app-using-distributed-queues/
// parameswaran marimuthu10: 56 PM
// https://towardsdatascience.com/streaming-twitter-data-into-a-mysql-database-d62a02b050d6