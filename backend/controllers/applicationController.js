const Application = require('../models/applicationModel');
const handleFactory = require('./handlerFactory');

const createApplication = handleFactory.createOne(Application);
const getApplication = handleFactory.getOne(Application);
const getApplications = handleFactory.getAll(Application);

// Accept or reject an application
const acceptOrRejectApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { decision } = req.body; // 'accept' or 'reject'

    const application = await Application.findById(applicationId);
    if (!application) {
      return next(new AppError('No application found with that ID', 404));
    }

    application.status = decision === 'accept' ? 'accepted' : 'rejected';
    await application.save();

    res.status(200).json({
      status: 'success',
      data: {
        data: application,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplication,
  getApplications,
  acceptOrRejectApplication,
};
