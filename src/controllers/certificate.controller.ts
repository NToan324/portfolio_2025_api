import { Request, Response } from "express";
import { certificateService } from "../services/certificate.service";

class CertificateController {
  async getCertificates(req: Request, res: Response) {
    res.send(await certificateService.getCertificate());
  }

  async createCertificate(req: Request, res: Response) {
    const payload = req.body;
    res.send(await certificateService.createCertificate(payload));
  }

  async deleteCertificateById(req: Request, res: Response) {
    const { id } = req.params;
    res.send(await certificateService.deleteCertificateById(id));
  }
}

const certificateController = new CertificateController();
export default certificateController;
