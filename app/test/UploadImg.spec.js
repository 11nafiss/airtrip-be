const base64Img = "baS3G4Str1nG";

describe("UploadImage", () => {
  it("should return uploaded image object", async () => {
    const cloudinaryResponse = { secure_url: "exampleurl.com" };
    const mockCloudinary = {
      uploader: {
        upload: jest.fn().mockReturnValue(Promise.resolve(cloudinaryResponse)),
      },
    };
    const fileTypeResult = {
      mime: "png",
    };
    const mockFileType = {
      fromBuffer: jest.fn().mockReturnValue(fileTypeResult),
    };
    jest.mock("../../config/cloudinary", () => mockCloudinary);
    jest.mock("file-type", () => mockFileType);
    const uploadImg = require("../services/utils/uploadImage");

    const result = await uploadImg.uploadImg(base64Img);
    const fileUrl = `data:png;base64,${base64Img}`;
    expect(mockFileType.fromBuffer).toHaveBeenCalledWith(
      Buffer.from(base64Img, "base64")
    );
    expect(mockCloudinary.uploader.upload).toHaveBeenCalledWith(fileUrl);
    expect(result).toBe(cloudinaryResponse);
  });
});
