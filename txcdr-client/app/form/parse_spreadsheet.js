const ExcelJS = require('exceljs');

async function parseSpreadsheet(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);
  const data = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber !== 1) { // Skipping header row
      const [question, type, options] = row.values.slice(1);
      data.push({
        question,
        type,
        options: options ? options.split(',').map(opt => opt.trim()) : []
      });
    }
  });

  return data;
}

module.exports = parseSpreadsheet;
