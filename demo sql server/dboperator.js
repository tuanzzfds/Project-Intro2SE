var config=require('./db');
const sql=require('mssql/msnodesqlv8');

// create function
//get list bill
async function getHD(start, num=100){
    try{
        let pool=await sql.connect(config);
        length = await pool.request().query("SELECT COUNT(*) FROM HOADON")
        // let products=await pool.request().query("SELECT RowNum, MaHD, MaKH FROM (SELECT MaHD, MaKH ,ROW_NUMBER() OVER (ORDER by MaHD) as RowNum FROM HoaDon ) as HD WHERE RowNum BETWEEN 1 AND (1 + (SELECT count(MaHD) from HoaDon)/10000 - 1)");
        let products=await pool.request().query("SELECT * FROM (SELECT ROW_NUMBER() OVER (ORDER BY MAHD) AS ROWNUMBER, * FROM HOADON)  AS T WHERE T.ROWNUMBER >= "+start+" AND T.ROWNUMBER <" + (parseInt(start)+parseInt(num)));
        return {tableLength: length.recordsets[0][0][""], data: products.recordsets[0]};
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
    getHD:getHD,
    addBill:addBill,

    invoiceStatisticMonth:invoiceStatisticMonth

}
