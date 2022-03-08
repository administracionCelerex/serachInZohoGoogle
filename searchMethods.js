const findByMobile = (number, contacts) => {
  //search in googleJSon phonesNumber

  const conactoExistente = contacts.filter((contacto) => {
    const phoneNumbers = contacto.phoneNumbers;
    if (!phoneNumbers) return false;

    if (!number) return false;

    const isExist = phoneNumbers.some((phoneNumber, ind) => {
      const canonical = phoneNumber.canonicalForm;

      if (!canonical) {
        const valueNum = phoneNumber.value
          ? phoneNumber.value.trim()
          : phoneNumber.value;

        if (!valueNum) return false;
        const withoutExtension = number.replace("+52", "");
        //console.log(withoutExtension);

        if (withoutExtension === valueNum) return true;
        return false;
      }

      const isEqual = canonical === number ? true : false;

      return isEqual;
    });

    return isExist;
  });

  //console.log(conactoExistente.length);

  if (conactoExistente.length > 1) {
    //console.log(conactoExistente);
  }

  return conactoExistente[0];
};

const findByEmail = (email, contacts) => {
  //search in googleJSon emailAddresses

  const conactoExistente = contacts.find((contacto) => {
    const emailAddresses = contacto.emailAddresses;

    if (!emailAddresses) return false;

    if (!email) return false;

    const isExist = emailAddresses.some((emailAddress, ind) => {
      const emailValue = emailAddress.value;

      if (!emailValue) {
        return false;
      }

      const isEqual = emailValue === email ? true : false;

      return isEqual;
    });

    return isExist;
  });

  return conactoExistente;
};

module.exports.findByMobile = findByMobile;

module.exports.findByEmail = findByEmail;
