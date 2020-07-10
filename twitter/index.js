const Twit = require('twit');
const client = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * Post a tweet to account.
 *
 * @example
 * const tweet = await Twitter.post('This is an update', res.media.media_id_string);
 * // returns success/error object
 *
 * @param  {String} tweet  Tweet string
 * @param  {Twitter} client Client instance of Twitter package
 * @return {Promise<ClientResponse>} Return error or success object
 */
const post = (tweet, media = null) => {
  const limit = 136;

  // ensure Tweet is correct length

  const tweetSubstr =
    tweet.length > limit ? `${tweet.substring(0, limit - 3)}...` : tweet;

  const data = media
    ? {
        status: tweetSubstr,
        media_ids: media,
      }
    : {
        status: tweetSubstr,
      };

  // use the client to post the message
  return client.post('statuses/update', data);
};

/**
 * @deprecated Needs to be updated
 * @see https://github.com/ttezel/twit#usage
 *
 * Upload media to Twitter to be used in
 * a tweet.
 *
 * @example
 * const res = await Twitter.uploadMedia('path/to/img');
 * console.log(res);
 * // {
 * //   media: ...,
 * //   error: ...,
 * //   response: ...
 * // }
 * const tweet = await Twitter.post('This is an update', res.media.media_id_string);
 * // returns media object
 * // Use in media_ids: media.media_id_string
 * // for status update object
 *
 * @param {*} imgPath
 * @returns {Promise} promise Resolves with error, media and response object.
 */
const uploadMedia = (imgPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = require('fs').readFileSync(imgPath);
      // TODO - add base64 encoding
      const res = await client.post('media/upload', { media_data: data });
      resolve(res);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

module.exports = {
  post,
  uploadMedia,
};
