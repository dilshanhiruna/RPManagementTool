const express = require('express');
const router = express.Router();

const {
  getTopicRequests,
  acceptOrRejectTopicRequest,
} = require('../controllers/TopicRequests');

router.get('/:supId', getTopicRequests);
router.post('/acceptOrReject/:stdGrpID', acceptOrRejectTopicRequest);

module.exports = router;
