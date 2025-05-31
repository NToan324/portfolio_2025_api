import mongoose, { InferSchemaType } from "mongoose";
const schema = mongoose.Schema;
const certificateSchema = new schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  urlImage: {
    type: String,
    required: true,
  },
  urlCertificate: {
    type: String,
  },
});

const certificate = mongoose.model("certificate", certificateSchema);
export type CertificateType = InferSchemaType<typeof certificateSchema>;
export default certificate;
