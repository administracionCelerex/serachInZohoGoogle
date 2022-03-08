const IGUAL = "IGUAL";
const TOCHECK = "TOCHECK";
const CASEERROR = "MAYUSCULAS";
const LENGTH = "LENGTH";
const EXTENSION = "EXTENSION";
const INVERT = "INVERT";

const checkRepeatValues = (idsGoogle) => {
  let findDuplicates = (arr) =>
    arr.filter((item, index) => arr.indexOf(item) != index);

  //console.log("Los id's repetidos son los siguientes");
  const duplicates = findDuplicates(idsGoogle); // All duplicates
  console.log(duplicates);
  return duplicates;
  //console.log([...new Set(findDuplicates(strArray))]); // Unique duplicates
};

const sameNameComparison = (nameZoho, nameGmail) => {
  if (nameZoho === nameGmail) {
    return IGUAL;
  }

  if (nameGmail.toUpperCase() === nameZoho.toUpperCase()) return CASEERROR;

  return TOCHECK;
};

const sameNumbersComparison = (zohoCelularesString, gmailCelularesString) => {
  let textExcelCompa = "";
  const gmailCelulares = gmailCelularesString.split(",");
  const zohoCelulares = zohoCelularesString.split(",");

  const gmailCelularesQuantity = gmailCelulares.length;
  const zohoCelularesQuantity = zohoCelulares.length;

  if (gmailCelularesQuantity != zohoCelularesQuantity) {
    textExcelCompa += `${LENGTH}/`;
  }

  for (let indexGC = 0; indexGC < gmailCelulares.length; indexGC++) {
    const gmailCelular = gmailCelulares[indexGC];

    for (let indexZC = 0; indexZC < zohoCelulares.length; indexZC++) {
      const zohoCel = zohoCelulares[indexZC];

      if (indexGC === indexZC) {
        if (gmailCelular !== zohoCel) {
          /* if (indexGC + 1 < gmailCelulares.length) {
            const gmCelAux = gmailCelulares[indexGC];
            if (gmCelAux == indexZC) {
              textExcelCompa += `${INVERT}/`;
            } else {
              textExcelCompa += `${EXTENSION}/`;
            }
          } else {
            textExcelCompa += `${EXTENSION}/`;
          } */
          const ordenChanged = gmailCelulares.some((gmC) => gmC === zohoCel);
          if (ordenChanged) {
            textExcelCompa += `${INVERT}/`;
          } else {
            textExcelCompa += `${EXTENSION}/`;
          }

          //return TOCHECK;
        }
      }
    }
  }
  if (textExcelCompa !== "") {
    textExcelCompa = `${TOCHECK}/${textExcelCompa}`;
    return textExcelCompa;
  }

  return IGUAL;
};

const sameBithdayComparison = (zohoBirthday, gmailBithday) => {
  if (zohoBirthday === gmailBithday) {
    return IGUAL;
  }

  return TOCHECK;
};

const sameCompany = (zohoCompany, gmailCompany) => {
  if (zohoCompany === gmailCompany) {
    return IGUAL;
  }

  if (!zohoCompany) return TOCHECK;
  if (!gmailCompany) return TOCHECK;
  if (zohoCompany.toUpperCase() === gmailCompany.toUpperCase()) {
    return CASEERROR;
  }

  return TOCHECK;
};

const sameEmailsComparison = (zohoEmailsString, gmailEmailsString) => {
  const gmailEmails = gmailEmailsString.split(",");
  const zohoEmails = zohoEmailsString.split(",");

  const gmailEmailsQuantity = gmailEmails.length;
  const zohoEmailsQuantity = zohoEmails.length;

  if (gmailEmailsQuantity != zohoEmailsQuantity) return TOCHECK;

  for (let indexGC = 0; indexGC < gmailEmails.length; indexGC++) {
    const gmailEmail = gmailEmails[indexGC];

    for (let indexZC = 0; indexZC < zohoEmails.length; indexZC++) {
      const zohoEmail = zohoEmails[indexZC];

      if (indexGC === indexZC) {
        if (gmailEmail !== zohoEmail) {
          return TOCHECK;
        }
      }
    }
  }

  return IGUAL;
};

const sameNotesComparison = (zohoNotes, gmailNotes) => {
  if (zohoNotes === gmailNotes) return IGUAL;

  if (zohoNotes.toUpperCase() === gmailNotes.toUpperCase()) return CASEERROR;

  return TOCHECK;
};

const sameNicknameComparison = (zohoNickname, gmailNickname) => {
  if (zohoNickname === gmailNickname) return IGUAL;

  if (zohoNickname.toUpperCase() === gmailNickname.toUpperCase())
    return CASEERROR;

  return TOCHECK;
};

const sameOccupations = (zohoOccupation, gmailOcupation) => {
  if (zohoOccupation === gmailOcupation) return IGUAL;

  if (zohoOccupation.toUpperCase() === gmailOcupation.toUpperCase())
    return CASEERROR;

  return TOCHECK;
};

const sameGender = (zohoGender, gmailGender) => {
  if (zohoGender === gmailGender) return IGUAL;

  if (zohoGender.toUpperCase() === gmailGender.toUpperCase()) return CASEERROR;

  return TOCHECK;
};

const sameOcupacion = (zohoOcupacion, gmailOcupacion) => {
  if (zohoOcupacion === gmailOcupacion) return IGUAL;

  if (zohoOcupacion.toUpperCase() === gmailOcupacion.toUpperCase())
    return CASEERROR;

  return TOCHECK;
};

module.exports.sameNameComparison = sameNameComparison;
module.exports.sameNumbersComparison = sameNumbersComparison;
module.exports.sameBithdayComparison = sameBithdayComparison;
module.exports.sameCompany = sameCompany;
module.exports.sameEmailsComparison = sameEmailsComparison;
module.exports.sameNotesComparison = sameNotesComparison;
module.exports.sameNicknameComparison = sameNicknameComparison;
module.exports.sameOccupations = sameOccupations;
module.exports.sameGender = sameGender;
module.exports.sameOcupacion = sameOcupacion;
module.exports.checkRepeatValues = checkRepeatValues;
