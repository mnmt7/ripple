const express = require('express');

const {
  acceptOrRejectApplication,
  getApplications,
  getApplication,
  createApplication,
} = require('../controllers/applicationController');
const { protect } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.post('/', createApplication);
router.get('/:applicationId', getApplication);
router.get('/', getApplications);
router.post('/:applicationId/decision', acceptOrRejectApplication);


module.exports = router;
