import { Request, Response } from "express";
import uploadService from "../services/upload.service";
class UploadController {
  async uploadImage(req: Request, res: Response) {
    const { image } = req.body;
    return res.send(await uploadService.uploadImage(image));
  }
  async uploadFile(req: Request, res: Response) {
    const file = req.file as Express.Multer.File;
    res.send(await uploadService.uploadFile(file));
  }
}

const uploadController = new UploadController();
export default uploadController;
