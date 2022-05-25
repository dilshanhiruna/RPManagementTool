const express = require('express');
const router = express.Router();

const { getTopicRequests } = require('../controllers/TopicRequests');

router.get('/:supId', getTopicRequests);

module.exports = router;
