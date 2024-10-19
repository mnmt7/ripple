const Campaign = require('../models/campaignModel');
const Application = require('../models/applicationModel');
const handleFactory = require('./handlerFactory');

const createCampaign = handleFactory.createOne(Campaign);

const getCampaign = handleFactory.getOne(Campaign);

const getAllCampaigns = handleFactory.getAll(Campaign);

const addUserId = (req, res, next) => {
  if (req.user.role === 'brand') {
    req.body.brandId = req.user._id;
  }

  next();
};

// Get all applications for a specific campaign
const getCampaignApplications = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const applications = await Application.find({ campaignId });

    res.status(200).json({
      status: 'success',
      results: applications.length,
      data: {
        data: applications,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignApplications,
  addUserId,
  getCampaign,
};
