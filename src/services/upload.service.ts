import { CreatedResponse } from "../core/success.response";
import cloudinaryV2 from "../storage/storage";
class UploadService {
  async uploadImage(file: string) {
    await cloudinaryV2.uploader.upload(file, (error, result) => {
      if (error) {
        throw new Error("Error uploading image");
      }
      return new CreatedResponse("Image uploaded", result);
    });
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new Error("File is required");
    }
    const uploadResult = await cloudinaryV2.uploader.upload(file.path, {
      resource_type: "raw",
    });
    const result = {
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
    };
    return new CreatedResponse("File uploaded", result);
  }
}

const uploadService = new UploadService();
export default uploadService;
