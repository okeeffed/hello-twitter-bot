require('dotenv').config();
const { post } = require('./twitter');

const main = async () => {
  try {
    console.log('Attempting to post');
    await post('First post from the blog helper bot!');
    console.log('Posted!');
  } catch (err) {
    console.error(err);
  }
};

main();
