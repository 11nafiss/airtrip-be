const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
const mockNext = jest.fn().mockReturnThis();
module.exports = {
  mockResponse,
  mockNext,
};
