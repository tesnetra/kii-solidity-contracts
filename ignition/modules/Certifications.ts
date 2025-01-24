import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

require("dotenv").config();

const CertificationsModule = buildModule("CertificationsModule", (m) => {
  const certifications = m.contract("Certifications");

  return { certifications };
});

module.exports = CertificationsModule;
