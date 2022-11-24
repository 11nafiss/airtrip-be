module.exports = {
  handleGetRoot(req, res) {
    res.status(200).json({
      status: "OK",
      message: "AIRTRIP API is up and running!",
    });
  },
};
