import * as XLSX from "xlsx";
import { Address } from "../types/event";
import * as FileSystem from "expo-file-system";

interface Question {
  sequence: number;
  field: string;
  descriptionOne: string;
  descriptionTwo: string;
  questionType: number;
  validation: string;
  required: boolean;
  options: string[];
}

// COMMENTED OUT: This function was using exceljs, which was breaking the app on startup
// export async function convertExcelToJSON(
//   filePath: string,
// ): Promise<Question[]> {
//   const workbook = new ExcelJS.Workbook();
//   await workbook.xlsx.readFile(filePath);
//   // Check if the worksheet exists
//   const worksheet = workbook.getWorksheet(1);
//   const questions: Question[] = [];

//   worksheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
//     if (rowNumber === 1) return; // Skip header row

//     const cells = row.values as (string | number)[];
//     const options = cells
//       .slice(9, 16)
//       .filter((option) => option !== null) as string[];

//     const question: Question = {
//       sequence: cells[1] as number,
//       field: cells[2] as string,
//       descriptionOne: cells[3] as string,
//       descriptionTwo: cells[4] as string,
//       questionType: cells[5] as number,
//       validation: cells[7] as string,
//       required: (cells[8] as string)?.toLowerCase() === "y",
//       options: options,
//     };

//     questions.push(question);
//   });

//   return questions;
// }

/**
 * Parses and validates as .xlsx file containing addresses in preparation for database insertion.
 * @param filepath Filepath of the .xlsx file
 * @param eventId ID of the event the addresses are associated with
 */
export async function parseAddressSheet(filepath: string, eventId: number) {
  const fileContent = await FileSystem.readAsStringAsync(filepath, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const workbook = XLSX.read(fileContent, { type: "base64" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const toUpload: Address[] = [];

  if (!worksheet) {
    return { data: null, error: new Error("File not readable") };
  }

  try {
    const rows = XLSX.utils
      .sheet_to_csv(worksheet)
      .split("\n")
      .map((row) => row.split(","));
    for (let i = 1; i < rows.length; i++) {
      const [blockId, number, street, type, city, state, zipCode] = rows[i].map(
        (cell: any) => cell.toString().trim(),
      );

      // Manual column type validation
      if (zipCode.length !== 5 || !/^[0-9]+$/.test(zipCode)) {
        return { data: null, error: new Error("Invalid zip code.") };
      }

      const address = {
        blockId,
        number,
        street,
        type,
        city,
        state,
        zipCode,
        claimerId: null,
        eventId: eventId,
      };

      toUpload.push(address);
      console.log(address);
    }
    return { data: toUpload, error: null };
  } catch (e) {
    let message =
      "There was an issue parsing the file. Please ensure it has the following columns: Block ID, Number, Street, Type, City, State, Zip Code.";
    if (e instanceof Error) message = e.message;
    return { data: null, error: new Error(message) };
  }
}
