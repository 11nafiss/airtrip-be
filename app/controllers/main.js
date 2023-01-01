module.exports = {
  handleGetRoot(req, res) {
    res.status(200).json({
      status: "OK",
      message: "AIRTRIP API is up and running!",
    });
  },

  // for handling unspecified error
  handleError(err, req, res, next) {
    return res.status(500).json({
      error: {
        name: err?.name || "error",
        message: err?.message,
      },
    });
  },

  handleNotFound(req, res) {
    res.status(404).json({
      message: "Error not found!",
    });
  },
};
