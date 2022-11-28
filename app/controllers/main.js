module.exports = {
  handleGetRoot(req, res) {
    res.status(200).json({
      status: "OK",
      message: "AIRTRIP API is up and running!",
    });
  },

  // for handling unspecified error
  handleError(req, res) {
    res.status(500).json({
      error: {
        name: req.error.name,
        message: req.error.message,
      },
    });
  },
};
