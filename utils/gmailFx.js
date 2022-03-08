const CONTACT = "CONTACT";

const EMPTYSIGNAL = "***";

const getNumbers = (phoneNumbers) => {
  if (!phoneNumbers) return EMPTYSIGNAL;

  const allPhoneNumbers = phoneNumbers.filter((phoNum) => {
    const isFromContact =
      phoNum.metadata.source.type === CONTACT ? true : false;

    return isFromContact;
  });

  const allPhoneNumbersFiltered = allPhoneNumbers.map((phoneNumber) => {
    const numeroTele = phoneNumber.canonicalForm
      ? phoneNumber.canonicalForm.trim()
      : phoneNumber.value.trim();

    return numeroTele;
  });

  //console.log(allPhoneNumbersFiltered);

  let telefonos = "";
  const telefonosGmail = allPhoneNumbersFiltered.map((phNum, ind) => {
    if (ind > 0) {
      telefonos += ",";
    }
    telefonos += `${phNum}`;
  });
  return telefonos;
};

const getNames = (names) => {
  if (!names) return "Sin Nombre";

  const nombresGmail = names.map((name) => {
    if (!name.metadata) return EMPTYSIGNAL;

    if (name.metadata.source.type === "CONTACT") {
      return name.displayName;
    }
    return "sin Nombre";
  });

  return nombresGmail[0];
};

const getTransformMonth = (monthNumber) => {
  let monthString = "";

  if (!monthNumber) {
    return "";
  }

  monthNumber = parseInt(monthNumber.toString());

  switch (monthNumber) {
    case 1:
      monthString = "Jan";
      break;

    case 2:
      monthString = "Feb";
      break;

    case 3:
      monthString = "Mar";
      break;

    case 4:
      monthString = "Apr";
      break;

    case 5:
      monthString = "May";
      break;

    case 6:
      monthString = "Jun";
      break;

    case 7:
      monthString = "Jul";
      break;

    case 8:
      monthString = "Aug";
      break;

    case 9:
      monthString = "Sep";
      break;

    case 10:
      monthString = "Oct";
      break;

    case 11:
      monthString = "Nov";
      break;

    case 12:
      monthString = "Dec";
      break;

    default:
      monthString = "Default";
      break;
  }

  return monthString;
};

const getTransformDayNumber = (daynumberString) => {
  if (!daynumberString) {
    return "";
  }

  let daynumber = parseInt(daynumberString);

  if (daynumber < 10) {
    return `0${daynumber}`;
  }

  return daynumber;
};

const getBithdays = (birthdays) => {
  let birthdaysString = "";

  if (!birthdays) return EMPTYSIGNAL;

  const birthdaysFiltered = birthdays.filter((birthday) => {
    const isFromContact =
      birthday.metadata.source.type === CONTACT ? true : false;

    return isFromContact;
  });
  for (let index = 0; index < birthdaysFiltered.length; index++) {
    const birthdayObj = birthdaysFiltered[index];
    const dateObj = birthdayObj.date;
    if (dateObj) {
      const { year, month, day } = dateObj;
      const monthString = getTransformMonth(month);
      const dayTransformed = getTransformDayNumber(day);
      const yearTransformed = year ? year : "0000";

      if (index > 0) {
        birthdaysString += ",";
      }
      birthdaysString += `${dayTransformed}-${monthString}-${yearTransformed}`;
    }
  }

  return birthdaysString.trim();
};

const getGmailCompany = (organizations) => {
  let companyObj = { name: "", title: "" };

  if (!organizations) {
    companyObj.name = EMPTYSIGNAL;
    companyObj.title = EMPTYSIGNAL;
    return companyObj;
  }

  const organizationsFiltered = organizations.filter((organization) => {
    return organization.metadata.source.type === CONTACT ? true : false;
  });

  if (!organizationsFiltered) {
    companyObj.name = EMPTYSIGNAL;
    companyObj.title = EMPTYSIGNAL;
    return companyObj;
  }

  for (let index = 0; index < organizationsFiltered.length; index++) {
    const organizationObj = organizationsFiltered[index];

    if (organizationObj) {
      const { name, title } = organizationObj;
      //console.log(organizationObj);
      if (index > 0) {
        companyObj.name += ",";
        companyObj.title += ",";
      }
      companyObj.name += name ? name.trim() : EMPTYSIGNAL;
      companyObj.title += title ? title.trim() : EMPTYSIGNAL;
    }
  }

  //console.log(companyObj);

  return companyObj;
};

const getGmailEmails = (emails) => {
  let emailListStr = "";

  if (!emails) {
    return EMPTYSIGNAL;
  }

  const emailsFiltered = emails.filter((email) => {
    return email.metadata.source.type === CONTACT ? true : false;
  });

  if (!emailsFiltered) return EMPTYSIGNAL;

  for (let index = 0; index < emailsFiltered.length; index++) {
    const emailObj = emailsFiltered[index];

    if (emailObj) {
      if (index > 0) {
        emailListStr += ",";
      }
      const value = emailObj.value ? emailObj.value.trim() : emailObj.value;
      emailListStr += value;
    }
  }

  return emailListStr;
};

const getGmailNotes = (biographies) => {
  let notesString = "";

  if (!biographies) return EMPTYSIGNAL;

  const biographiesFiltered = biographies.filter((biography) => {
    return biography.metadata.source.type === CONTACT ? true : false;
  });

  if (!biographiesFiltered) return EMPTYSIGNAL;

  for (let index = 0; index < biographiesFiltered.length; index++) {
    const biogObj = biographiesFiltered[index];

    if (biogObj) {
      if (index > 0) {
        notesString += ",";
      }
      const value = biogObj.value ? biogObj.value.trim() : biogObj.value;
      notesString += value;
    }
  }

  return notesString;
};

const getGmailNickname = (nicknames) => {
  let nicknamesString = "";

  if (!nicknames) return EMPTYSIGNAL;

  const nicknamesFiltered = nicknames.filter((nickname) => {
    return nickname.metadata.source.type === CONTACT ? true : false;
  });

  if (!nicknamesFiltered) return EMPTYSIGNAL;

  for (let index = 0; index < nicknamesFiltered.length; index++) {
    const nicknameObj = nicknamesFiltered[index];

    if (nicknameObj) {
      if (index > 0) {
        nicknamesString += ",";
      }
      const value = nicknameObj.value
        ? nicknameObj.value.trim()
        : nicknameObj.value;
      nicknamesString += value;
    }
  }

  return nicknamesString;
};

const getTranslateGender = (genderEng) => {
  let genderSpa = "";
  if (!genderEng) return EMPTYSIGNAL;

  switch (genderEng) {
    case "male":
      genderSpa = "Hombre";
      break;

    case "female":
      genderSpa = "Mujer";
      break;

    case "other":
      genderSpa = "Otro";
      break;

    default:
      genderSpa = "Warning";
      break;
  }

  return genderSpa;
};

const getGmailGenders = (genders) => {
  let gendersString = "";

  if (!genders) return EMPTYSIGNAL;

  const gendersFiltered = genders.filter((gender) => {
    return gender.metadata.source.type === CONTACT ? true : false;
  });

  if (!gendersFiltered) return EMPTYSIGNAL;

  for (let index = 0; index < gendersFiltered.length; index++) {
    const genderObj = gendersFiltered[index];
    //console.log(genderObj);

    if (genderObj) {
      if (index > 0) {
        gendersString += ",";
      }

      const value = genderObj.value ? genderObj.value.trim() : genderObj.value;

      const genderSpanish = getTranslateGender(value);

      gendersString += genderSpanish;
    }
  }

  return gendersString;
};

const getGmailOcupation = (occupations) => {
  let ocupationsString = "";

  if (!occupations) return EMPTYSIGNAL;

  const occupationsFiltered = occupations.filter((occupation) => {
    return occupation.metadata.source.type === CONTACT ? true : false;
  });

  if (!occupationsFiltered) return EMPTYSIGNAL;

  for (let index = 0; index < occupationsFiltered.length; index++) {
    const occupationObj = occupationsFiltered[index];
    //console.log(occupationObj);

    if (occupationObj) {
      if (index > 0) {
        ocupationsString += ",";
      }

      const value = occupationObj.value
        ? occupationObj.value.trim()
        : occupationObj.value;

      ocupationsString += value;
    }
  }

  return ocupationsString;
};

const getGmailAddresses = (addresss) => {
  let AddressessString = "";

  if (!addresss) return EMPTYSIGNAL;

  const addresssFiltered = addresss.filter((address) => {
    return address.metadata.source.type === CONTACT ? true : false;
  });

  if (!addresssFiltered) return EMPTYSIGNAL;

  for (let index = 0; index < addresssFiltered.length; index++) {
    const addressObj = addresssFiltered[index];
    //console.log(addressObj);

    if (addressObj) {
      if (index > 0) {
        AddressessString += ",";
      }

      let value = addressObj.formattedValue
        ? addressObj.formattedValue.trim()
        : addressObj.formattedValue;

      value = !value ? EMPTYSIGNAL : value;
      AddressessString += `{${value}}`;
    }
  }

  return AddressessString;
};

module.exports.getNumbers = getNumbers;
module.exports.getNames = getNames;
module.exports.getBithdays = getBithdays;
module.exports.getGmailCompany = getGmailCompany;
module.exports.getGmailEmails = getGmailEmails;
module.exports.getGmailNotes = getGmailNotes;
module.exports.getGmailNickname = getGmailNickname;
module.exports.getGmailGenders = getGmailGenders;
module.exports.getGmailOcupation = getGmailOcupation;
module.exports.getGmailAddresses = getGmailAddresses;
