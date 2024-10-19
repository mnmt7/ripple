const express = require('express');
const router = express.Router();

const {
  createCampaign,
  getAllCampaigns,
  getCampaign,
  getUserCampaigns,
  getCampaignApplications,
  addUserId,
} = require('../controllers/campaignController');
const { protect } = require('../controllers/authController');
const applicationRouter = require('./applicationRoutes');

router.use('/:campaignId/applications', applicationRouter);

router.use(protect);

router.post('/', addUserId, createCampaign);

router.get('/:id', getCampaign);

router.get('/', getAllCampaigns);

// router.get('/user/:userId', getUserCampaigns);

// router.get('/:campaignId/applications', getCampaignApplications);

module.exports = router;
