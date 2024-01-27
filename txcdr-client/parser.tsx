import * as ExcelJS from "exceljs";

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

async function convertExcelToJSON(filePath: string): Promise<Question[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  // Check if the worksheet exists
  const worksheet = workbook.getWorksheet(1);
  const questions: Question[] = [];

  worksheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header row

    const cells = row.values as (string | number)[];
    const options = cells
      .slice(9, 16)
      .filter((option) => option !== null) as string[];

    const question: Question = {
      sequence: cells[1] as number,
      field: cells[2] as string,
      descriptionOne: cells[3] as string,
      descriptionTwo: cells[4] as string,
      questionType: cells[5] as number,
      validation: cells[7] as string,
      required: (cells[8] as string)?.toLowerCase() === "y",
      options: options,
    };

    questions.push(question);
  });

  return questions;
}

const filePath = "TXCDR.RiceApps.Questions.xlsx";
convertExcelToJSON(filePath).then((questions) => {
  console.log(JSON.stringify(questions, null, 2));
});
