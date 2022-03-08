const getPhoneNumbers = (contactoCrm) => {
  const celularCrm = contactoCrm.Celular ? `${contactoCrm.Celular.trim()}` : "";
  const telefonoCrm = contactoCrm.Telefono
    ? `,${contactoCrm.Telefono.trim()}`
    : "";
  const extraPhones = contactoCrm.Telefonos
    ? `,${contactoCrm.Telefonos.trim()}`
    : "";
  const celularesZoho = `${celularCrm}${telefonoCrm}${extraPhones}`;

  if (celularesZoho === "") return "***";
  return celularesZoho;
};

const getEmails = (contactoCrm) => {
  const email1 = contactoCrm.Email ? contactoCrm.Email.trim() : "";
  const email2 = contactoCrm["Emails"]
    ? `,${contactoCrm["Emails"].trim()}`
    : "";

  const emailsZoho = `${email1}${email2}`;
  

  if (emailsZoho === "") return "***";

  return emailsZoho;
};

module.exports.getPhoneNumbers = getPhoneNumbers;
module.exports.getEmails = getEmails;
