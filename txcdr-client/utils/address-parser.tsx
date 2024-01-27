import * as ExcelJS from 'exceljs';

type Address = {
  name: string,
  street: string,
  type: string,
  city: string,
  state: string,
  zipCode: string
}

type CensusData ={
  census: string,
  addresses: Address[],
}

async function parseExcel(filePath: string) {
  const workbook = new ExcelJS.Workbook();
  
  try{
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    type AddressArray = CensusData[];

    const JSONData: AddressArray = [];


    worksheet?.eachRow(function(row, rowNumber){
      if(row.getCell(1).value === undefined){
        throw new Error;
      }
      const census: any = row.getCell(1).value;
      const address: any = row.getCell(2).value;

     
      
      if(JSONData.find(entry => entry.census == census)){
        JSONData.find(entry => entry.census == census)?.addresses.push(address);
      }else{
        JSONData.push({"census": census, "addresses": [address]});
      }


    })
    return JSONData;
    

  }catch(error){
    throw new Error("invalid file or row not formatted");
  }
  
}


parseExcel("mockaddress.xlsx").then((resp) => {
  console.log(resp);
})
