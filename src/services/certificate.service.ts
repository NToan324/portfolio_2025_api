import { OkResponse } from "../core/success.response";
import certificateModel, { CertificateType } from "../models/certificate.model";
class CertificateService {
  async getCertificate() {
    const certificates = await certificateModel.find().sort({ date: -1 });
    return new OkResponse("Certificates found", certificates);
  }

  async createCertificate(payload: CertificateType) {
    const { title, description, urlImage, urlCertificate } = payload;
    const newCertificate = await certificateModel.create({
      title,
      description,
      urlImage,
      urlCertificate,
    });
    return new OkResponse("Certificate created", newCertificate);
  }

  async deleteCertificateById(id: string) {
    if (!id) {
      throw new Error("Certificate ID is required");
    }
    const deletedCertificate = await certificateModel.findByIdAndDelete(id);
    if (!deletedCertificate) {
      throw new Error("Certificate not found");
    }
    return new OkResponse("Certificate deleted", deletedCertificate);
  }
}

const certificateService = new CertificateService();
export { certificateService, CertificateService };
