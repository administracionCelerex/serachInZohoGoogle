const XSLX = require("xlsx");
const searchMethods = require("./searchMethods");
const fs = require("fs");
const createExcel = require("./utils/createExcel");
const zohoFx = require("./utils/zohoFx");
const gmailFx = require("./utils/gmailFx");
const sharedFx = require("./utils/sharedFx");

const EMPTYSIGNAL = "***";

//A = ZOHO B = GMAIL

const readExcel = (path) => {
  const workbook = XSLX.readFile(path);
  const workbookSheets = workbook.SheetNames;

  //console.log(workbookSheets);
  const sheet = workbookSheets[0];
  const dataExcel = XSLX.utils.sheet_to_json(workbook.Sheets[sheet], {
    raw: false,
  });

  // console.log(f);

  return dataExcel;
};

const ecxelPath = "./data/datacrm.xls";

const jsonPathContacts = "./data/contactos.json";
const arrayContactosAmbos = [];
const idsGoogle = [];
const peopleThatExistButNeverFound = ["people/c6188866870949247511"];

const gmailJsonToEcxel = (gmailContacts) => {
  const rows = [];
  gmailContacts.forEach((gmailContact) => {
    const gmailConTranformed = getGmailColumns(gmailContact);
    rows.push(gmailConTranformed);
  });
  createExcel.createGmailExcel(rows);
};

const getGmailColumns = (gmailContact) => {
  const {
    resourceName,
    etag,
    names,
    phoneNumbers,
    birthdays,
    organizations,
    emailAddresses,
    biographies,
    nicknames,
    genders,
    occupations,
    addresses,
  } = gmailContact;

  const nombreGmail = gmailFx.getNames(names);
  const telefonosGmail = gmailFx.getNumbers(phoneNumbers);
  const fechasDeNacimientoGmail = gmailFx.getBithdays(birthdays);
  const empresaGmailObj = gmailFx.getGmailCompany(organizations);
  const empresaNameGmail = empresaGmailObj.name;
  const puestoGmail = empresaGmailObj.title;
  const emailsGmail = gmailFx.getGmailEmails(emailAddresses);
  const notasGmail = gmailFx.getGmailNotes(biographies);
  const apodoGmail = gmailFx.getGmailNickname(nicknames);
  const generoGmail = gmailFx.getGmailGenders(genders);
  const ocupacionGmail = gmailFx.getGmailOcupation(occupations);
  const direccionesGmail = gmailFx.getGmailAddresses(addresses);

  const gmailColumns = {
    IDGMAIL: resourceName,
    etagGmail: etag,
    nombreGmail: nombreGmail,
    telefonosGmail,
    fechasDeNacimientoGmail,
    empresaGmail: empresaNameGmail,
    emailsGmail,
    notasGmail,
    apodoGmail,
    puestoGmail,
    generoGmail,
    ocupacionGmail,
    direccionesGmail,
    //notas,
  };
  return gmailColumns;
};

const transfomData = (contactoCrm, contactoGmail, notas) => {
  const {
    resourceName,
    etag,
    names,
    birthdays,
    organizations,
    emailAddresses,
    biographies,
    nicknames,
    genders,
    occupations,
    addresses,
    phoneNumbers,
  } = contactoGmail;

  const nombreGmail = gmailFx.getNames(names);
  const { ID } = contactoCrm;
  const nombreZoho = contactoCrm.nombreZoho
    ? contactoCrm.nombreZoho
    : EMPTYSIGNAL;
  const comparacionNombre = sharedFx.sameNameComparison(
    nombreZoho,
    nombreGmail
  );
  const celularesZoho = zohoFx.getPhoneNumbers(contactoCrm);
  const telefonosGmail = gmailFx.getNumbers(phoneNumbers);
  const comparacionTelefonos = sharedFx.sameNumbersComparison(
    celularesZoho,
    telefonosGmail
  );

  const fechaNacimientoZoho = contactoCrm["Fecha Nacimiento"]
    ? contactoCrm["Fecha Nacimiento"].trim()
    : EMPTYSIGNAL;
  const fechasDeNacimientoGmail = gmailFx.getBithdays(birthdays);

  const comparacionFechaNac = sharedFx.sameBithdayComparison(
    fechaNacimientoZoho,
    fechasDeNacimientoGmail
  );

  const empresaZoho = contactoCrm["Empresa"]
    ? contactoCrm["Empresa"].trim()
    : EMPTYSIGNAL;
  const empresaGmailObj = gmailFx.getGmailCompany(organizations);
  const empresaNameGmail = empresaGmailObj.name;
  const comparacionEmpresa = sharedFx.sameCompany(
    empresaZoho,
    empresaNameGmail
  );

  const emailsZoho = zohoFx.getEmails(contactoCrm);
  const emailsGmail = gmailFx.getGmailEmails(emailAddresses);
  const comparacionEmails = sharedFx.sameEmailsComparison(
    emailsZoho,
    emailsGmail
  );

  const notasZoho = contactoCrm["Notas"]
    ? contactoCrm["Notas"].trim()
    : EMPTYSIGNAL;
  const notasGmail = gmailFx.getGmailNotes(biographies);
  const comparacionNotas = sharedFx.sameNotesComparison(notasZoho, notasGmail);

  const apodoZoho = contactoCrm["Apodo"]
    ? contactoCrm["Apodo"].trim()
    : EMPTYSIGNAL;

  const apodoGmail = gmailFx.getGmailNickname(nicknames);
  const comparacionApodo = sharedFx.sameNicknameComparison(
    apodoZoho,
    apodoGmail
  );

  const puestoZoho = contactoCrm["Puesto"]
    ? contactoCrm["Puesto"].trim()
    : EMPTYSIGNAL;

  const puestoGmail = empresaGmailObj.title;
  const comparacionPuesto = sharedFx.sameOccupations(puestoZoho, puestoGmail);

  const generoZoho = contactoCrm["Genero"]
    ? contactoCrm["Genero"].trim()
    : EMPTYSIGNAL;
  const generoGmail = gmailFx.getGmailGenders(genders);
  const comparacionGenero = sharedFx.sameGender(generoZoho, generoGmail);

  const ocupacionZoho = contactoCrm["Ocupacion"]
    ? contactoCrm["Ocupacion"].trim()
    : EMPTYSIGNAL;
  const ocupacionGmail = gmailFx.getGmailOcupation(occupations);

  const comparacionOcupacion = sharedFx.sameOccupations(
    ocupacionZoho,
    ocupacionGmail
  );

  const direccioneZoho = contactoCrm["Direcciones"]
    ? contactoCrm["Direcciones"].trim()
    : EMPTYSIGNAL;

  const direccionesGmail = gmailFx.getGmailAddresses(addresses);

  const resultCont = {
    IDZOHO: ID,
    IDGMAIL: resourceName,
    etagGmail: etag,
    nombreZoho: nombreZoho.trim(),
    nombreGmail: nombreGmail,
    comparacionNombre,
    celularesZoho,
    telefonosGmail,
    comparacionTelefonos,
    fechaNacimientoZoho,
    fechasDeNacimientoGmail,
    comparacionFechaNac,
    empresaZoho,
    empresaGmail: empresaNameGmail,
    comparacionEmpresa,
    emailsZoho,
    emailsGmail,
    comparacionEmails,
    notasZoho,
    notasGmail,
    comparacionNotas,
    apodoZoho,
    apodoGmail,
    comparacionApodo,
    puestoZoho,
    puestoGmail,
    comparacionPuesto,
    generoZoho,
    generoGmail,
    comparacionGenero,
    ocupacionZoho,
    ocupacionGmail,
    comparacionOcupacion,
    direccioneZoho,
    direccionesGmail,
    //notas,
  };

  idsGoogle.push(resourceName); //para ver los repetidos
  arrayContactosAmbos.push(resultCont);
};

/* const transfomData = (contactoCrm, contactoGmail, notas) => {
  const {
    resourceName,
    etag,
    names,
    birthdays,
    organizations,
    emailAddresses,
    biographies,
    nicknames,
    genders,
    occupations,
    addresses,
    phoneNumbers,
  } = contactoGmail;

  const nombreGmail = gmailFx.getNames(names);
  const { ID } = contactoCrm;
  const nombreZoho = contactoCrm.nombreZoho
    ? contactoCrm.nombreZoho
    : EMPTYSIGNAL;
  const comparacionNombre = sharedFx.sameNameComparison(
    nombreZoho,
    nombreGmail
  );
  const celularesZoho = zohoFx.getPhoneNumbers(contactoCrm);
  const telefonosGmail = gmailFx.getNumbers(phoneNumbers);
  const comparacionTelefonos = sharedFx.sameNumbersComparison(
    celularesZoho,
    telefonosGmail
  );

  const fechaNacimientoZoho = contactoCrm["Fecha Nacimiento"]
    ? contactoCrm["Fecha Nacimiento"].trim()
    : EMPTYSIGNAL;
  const fechasDeNacimientoGmail = gmailFx.getBithdays(birthdays);

  const comparacionFechaNac = sharedFx.sameBithdayComparison(
    fechaNacimientoZoho,
    fechasDeNacimientoGmail
  );

  const empresaZoho = contactoCrm["Empresa"]
    ? contactoCrm["Empresa"].trim()
    : EMPTYSIGNAL;
  const empresaGmailObj = gmailFx.getGmailCompany(organizations);
  const empresaNameGmail = empresaGmailObj.name;
  const comparacionEmpresa = sharedFx.sameCompany(
    empresaZoho,
    empresaNameGmail
  );

  const emailsZoho = zohoFx.getEmails(contactoCrm);
  const emailsGmail = gmailFx.getGmailEmails(emailAddresses);
  const comparacionEmails = sharedFx.sameEmailsComparison(
    emailsZoho,
    emailsGmail
  );

  const notasZoho = contactoCrm["Notas"]
    ? contactoCrm["Notas"].trim()
    : EMPTYSIGNAL;
  const notasGmail = gmailFx.getGmailNotes(biographies);
  const comparacionNotas = sharedFx.sameNotesComparison(notasZoho, notasGmail);

  const apodoZoho = contactoCrm["Apodo"]
    ? contactoCrm["Apodo"].trim()
    : EMPTYSIGNAL;

  const apodoGmail = gmailFx.getGmailNickname(nicknames);
  const comparacionApodo = sharedFx.sameNicknameComparison(
    apodoZoho,
    apodoGmail
  );

  const puestoZoho = contactoCrm["Puesto"]
    ? contactoCrm["Puesto"].trim()
    : EMPTYSIGNAL;

  const puestoGmail = empresaGmailObj.title;
  const comparacionPuesto = sharedFx.sameOccupations(puestoZoho, puestoGmail);

  const generoZoho = contactoCrm["Genero"]
    ? contactoCrm["Genero"].trim()
    : EMPTYSIGNAL;
  const generoGmail = gmailFx.getGmailGenders(genders);
  const comparacionGenero = sharedFx.sameGender(generoZoho, generoGmail);

  const ocupacionZoho = contactoCrm["Ocupacion"]
    ? contactoCrm["Ocupacion"].trim()
    : EMPTYSIGNAL;
  const ocupacionGmail = gmailFx.getGmailOcupation(occupations);

  const comparacionOcupacion = sharedFx.sameOccupations(
    ocupacionZoho,
    ocupacionGmail
  );

  const direccioneZoho = contactoCrm["Direcciones"]
    ? contactoCrm["Direcciones"].trim()
    : EMPTYSIGNAL;

  const direccionesGmail = gmailFx.getGmailAddresses(addresses);

  const resultCont = {
    IDZOHO: ID,
    IDGMAIL: resourceName,
    etagGmail: etag,
    nombreZoho: nombreZoho.trim(),
    nombreGmail: nombreGmail,
    comparacionNombre,
    celularesZoho,
    telefonosGmail,
    comparacionTelefonos,
    fechaNacimientoZoho,
    fechasDeNacimientoGmail,
    comparacionFechaNac,
    empresaZoho,
    empresaGmail: empresaNameGmail,
    comparacionEmpresa,
    emailsZoho,
    emailsGmail,
    comparacionEmails,
    notasZoho,
    notasGmail,
    comparacionNotas,
    apodoZoho,
    apodoGmail,
    comparacionApodo,
    puestoZoho,
    puestoGmail,
    comparacionPuesto,
    generoZoho,
    generoGmail,
    comparacionGenero,
    ocupacionZoho,
    ocupacionGmail,
    comparacionOcupacion,
    direccioneZoho,
    direccionesGmail,
    //notas,
  };

  idsGoogle.push(resourceName); //para ver los repetidos
  arrayContactosAmbos.push(resultCont);
}; */

const dataCrmJson = readExcel(ecxelPath);

let rawdata = fs.readFileSync(jsonPathContacts);
let contactsObj = JSON.parse(rawdata);

gmailJsonToEcxel(contactsObj.connections);
console.log(contactsObj.connections.length);
//searching in Google Json for Celular

const dataCrmNotFoundYetAfterPhones = dataCrmJson.filter((dataCrm, index) => {
  const celular = dataCrm.Celular ? dataCrm.Celular.trim() : dataCrm.Celular;
  const contacts = contactsObj.connections;
  //console.log(contacts);
  const contactoExistente = searchMethods.findByMobile(celular, contacts);

  if (contactoExistente) {
    transfomData(
      dataCrm,
      contactoExistente,
      "Fue Encontado por el Celular del CRM"
    );
    return false;
  } else {
    const telefono = dataCrm["Telefono"]
      ? dataCrm["Telefono"].trim()
      : dataCrm["Telefono"];
    //console.log(telefono + ` i:${index}`);
    const contactoExistenteTelefono = searchMethods.findByMobile(
      telefono,
      contacts
    );

    if (contactoExistenteTelefono) {
      transfomData(
        dataCrm,
        contactoExistenteTelefono,
        "Fue econtrado por el Telefono del CRM"
      );
      //console.log("Encontro por Telefono" + ` i:${index} T:${telefono}`);
      return false;
    }

    return true;
  }
});

//console.log(arrayContactosAmbos.length)
//console.log(dataCrmNotFoundYetAfterPhones.length);

//2,- Buscar por Email Contactos Restantes

const dataCrmLeftAfterLookEmail = dataCrmNotFoundYetAfterPhones.filter(
  (dataCrm) => {
    const email = dataCrm["Email"] ? dataCrm["Email"].trim() : dataCrm["Email"];
    const contacts = contactsObj.connections;
    const contactoExistente = searchMethods.findByEmail(email, contacts);

    if (contactoExistente) {
      //console.log(email);
      transfomData(
        dataCrm,
        contactoExistente,
        "Fue Encontrado Por Email quiza los telefonos difieran"
      );
      return false;
    }
    return true;

    //console.log(email);
  }
);

/* console.log(arrayContactosAmbos.length);
console.log(dataCrmLeftAfterLookEmail.length); */

const dataCrmLeftAfterLookExtraEmails = dataCrmLeftAfterLookEmail.filter(
  (dataCrm) => {
    //necesita ser actualizado para clientes con mas de un email Extra
    const emailExtra = dataCrm["Emails"]
      ? dataCrm["Emails"].trim()
      : dataCrm["Emails"];
    const contacts = contactsObj.connections;
    const contactoExistente = searchMethods.findByEmail(emailExtra, contacts);

    if (contactoExistente) {
      transfomData(
        dataCrm,
        contactoExistente,
        "Fue encontrado por un email secundario, revisar si el principal esta "
      );
      return false;
    }
    return true;
  }
);

//console.log(arrayContactosAmbos);
/* console.log(arrayContactosAmbos.length);
console.log(dataCrmLeftAfterLookExtraEmails.length); */

//A ∩ B

createExcel.AnB(arrayContactosAmbos);

//A-B

createExcel.AMinusB(dataCrmLeftAfterLookEmail);

const duplicatesIds = sharedFx.checkRepeatValues(idsGoogle);

createExcel.createDublicatesIdFile(duplicatesIds);

console.log("Terminado");
