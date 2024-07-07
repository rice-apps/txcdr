import * as ExcelJS from "exceljs";

type Address = {
  number: string;
  street: string;
  type: string;
  city: string;
  state: string;
  zipCode: string;
};

type CensusData = {
  census: string;
  addresses: Address[];
};

export async function parseExcel(filePath: string) {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    type AddressArray = CensusData[];

    const JSONData: AddressArray = [];

    worksheet?.eachRow(function (row, rowNumber) {
      if (row.getCell(1).value === undefined) {
        throw new Error();
      }

      const census: string = row.getCell(1).value as string;

      const address: Address = {
        number: row.getCell(2).value as string,
        street: row.getCell(3).value as string,
        type: row.getCell(4).value as string,
        city: row.getCell(5).value as string,
        state: row.getCell(6).value as string,
        zipCode: row.getCell(7).value as string,
      };

      if (JSONData.find((entry) => entry.census == census)) {
        JSONData.find((entry) => entry.census == census)?.addresses.push(
          address,
        );
      } else {
        JSONData.push({ census: census, addresses: [address] });
      }
    });
    return JSONData;
  } catch (error) {
    throw new Error("invalid file or row not formatted");
  }
}
