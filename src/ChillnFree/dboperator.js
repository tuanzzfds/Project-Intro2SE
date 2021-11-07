var config=require('./db');
const sql=require('mssql/msnodesqlv8');

// create function
//get list bill
async function getSong(){
    try{
        let pool=await sql.connect(config);
        let products=await pool.request().query("SELECT * FROM song");
        console.log(products.recordsets);
        return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

//Invoice statistics by month
async function invoiceStatisticMonth(year){
    try{
        let pool=await sql.connect(config);
        let products=await pool.request()
            .input('y',year)
            .execute('GetInvoiceStatistic');
        console.log(products.recordsets);
        return products.recordsets;
    }
    catch(error){
        console.log(error);
    }

}


async function addBill(bill){
    try{
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
        .input('MaHD', sql.VarChar(6), bill.MaHD)
        .input('MaKH', sql.VarChar(6), bill.MaKH)
        .input('NgayLap', sql.DateTime, bill.NgayLap)
        .input('TongTien', sql.Int, bill.TongTien)
        .query("INSERT INTO HoaDon VALUES('" + bill.MaHD + "', '" + bill.MaKH + "', '" + bill.NgayLap + "', NULL)");
        //.execute('InsertBills');
        console.log(insertProduct)
        return insertProduct.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports={
    getSong:getSong,
    addBill:addBill,

    invoiceStatisticMonth:invoiceStatisticMonth

}
