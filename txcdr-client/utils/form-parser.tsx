import * as ExcelJS from 'exceljs';

type Question = {
  sequence: number;
  field: string;
  descriptionOne: string;
  descriptionTwo: string;
  questionType: number;
  required: boolean;
  options: string[];
}

type Form = {
  header: string,
  questions: Question[],
}

//returns an array of Forms where the headers corresponds to their range 100-199, 200-299, etc.
async function parseExcel(filePath: string) {
  const workbook = new ExcelJS.Workbook();
  
  try{
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    type QuestionArray = Form[];

    const JSONData: QuestionArray = [];

    worksheet?.eachRow(function(row, rowNumber){
      if(row.getCell(1).value === undefined){
        throw new Error;
      }

      let startRange = (Math.floor((row.getCell(1).value as number) / 100) * 100);  
      let endRange = startRange + 99;

      const header: string = startRange.toString() + "-" + endRange.toString();
      const options : string[] = [];

      if (row.getCell(10).value == undefined) {
        options.push(row.getCell(10).value as string);
      }
      
      if (row.getCell(11).value == undefined) {
        options.push(row.getCell(11).value as string);
      }
      
      if (row.getCell(12).value == undefined) {
        options.push(row.getCell(12).value as string);
      }

      if (row.getCell(13).value == undefined) {
        options.push(row.getCell(13).value as string);
      }

      if (row.getCell(14).value == undefined) {
        options.push(row.getCell(14).value as string);
      }

      if (row.getCell(15).value == undefined) {
        options.push(row.getCell(15).value as string);
      }

      if (row.getCell(16).value == undefined) {
        options.push(row.getCell(16).value as string);
      }

      const question: Question = {
        sequence: row.getCell(1).value as number,
        field: row.getCell(2).value as string,
        descriptionOne: row.getCell(3).value as string,
        descriptionTwo: row.getCell(4).value as string,
        questionType: row.getCell(5).value as number,
        required: (row.getCell(8).value as string)?.toLowerCase() === "y",
        options: options
      }
      
      if(JSONData.find(entry => entry.header == header)){
        JSONData.find(entry => entry.header == header)?.questions.push(question);
      }else{
        JSONData.push({"header": header, "questions": [question]});
      }


    })
    return JSONData;
    

  }catch(error){
    throw new Error("invalid file or row not formatted");
  }
  
}

export default parseExcel;