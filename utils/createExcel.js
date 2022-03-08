const XSLX = require("xlsx");
const fsa = require("../data/contactos.json");
const fs = require("fs");

const createGmailExcel = (rows) => {
  const sheetName = "GMAIL";

  const sheetB = XSLX.utils.json_to_sheet(rows);
  const workbook = XSLX.utils.book_new();
  workbook.SheetNames.push(sheetName);
  workbook.Sheets[sheetName] = sheetB;
  XSLX.writeFile(workbook, "./data/GmailDataConverted.xlsx");
};

const AnB = (contacts) => {
  //Zoho Inteseccion con GMAIL
  // no es 100% efectivo los nombres son complicados de comparar por lo cual es necesario hacerlo a mano

  const sheetAnB = XSLX.utils.json_to_sheet(contacts);
  const workbook = XSLX.utils.book_new();
  workbook.SheetNames.push(`Ambos`);
  workbook.Sheets["Ambos"] = sheetAnB;
  XSLX.writeFile(workbook, "./data/interseccion.xlsx");
};

const AMinusB = (contacts) => {
  //A-B

  const sheetAMinusB = XSLX.utils.json_to_sheet(contacts);
  const workbook = XSLX.utils.book_new();
  workbook.SheetNames.push(`SOloZoho`);
  workbook.Sheets["SOloZoho"] = sheetAMinusB;
  XSLX.writeFile(workbook, "./data/A-B.xlsx");
};

const createDublicatesIdFile = (duplicates) => {
  const duplicatesMapped = duplicates.map((duplicate) => {
    return `${duplicate}\n`;
  });
  try {
    fs.writeFileSync(
      "./data/idsRepetidos.txt",
      duplicatesMapped.toString().replaceAll(",", "")
    );
    //file written successfully
  } catch (err) {
    console.error(err);
  }
};

module.exports.AnB = AnB;
module.exports.AMinusB = AMinusB;
module.exports.createGmailExcel = createGmailExcel;
module.exports.createDublicatesIdFile = createDublicatesIdFile;
