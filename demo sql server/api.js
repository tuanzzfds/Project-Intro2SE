var Db= require('./db');
var config=require('./db');
const sql=require('mssql/msnodesqlv8');
const dboperator=require('./dboperator');


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan=require('morgan');
var app = express();
var router = express.Router();

app.use(morgan('dev'));

app.get('/',(reg,res)=>{
    res.json({
        msg:'root'
    });
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use('/api', router);

router.use((request,response,next)=>{
   console.log('middleware');
   next();
})
// call  function
router.route('/bill').get((request,response)=>{
    var start = request.query['start']
    if (!start || start<0)
        start = 0
    console.log(start)
    dboperator.getHD(start).then(result => {
       response.json(result);
    })

})

router.route('/bill_month/:year').get((request,response)=>{
    dboperator.invoiceStatisticMonth(request.params.year).then(result =>{
        console.log(result[0]);
        response.json(result);
    })
})

router.route('/bill').post((request,response)=>{
    
   let bill = {...request.body};
   console.log(request.body)
    dboperator.addBill(bill).then(result => {
       response.status(201).json(result);
    })  /*
    console.log(req.body)
    sql.connect(config).then(() => {
        return sql.query("INSERT INTO HoaDon VALUES('" + req.body.MaHD + "', '" + req.body.MaKH + "', '" + req.body.NgayLap + "', NULL)");
    }).then(result => {
        response.status(201).json(result);
    }).catch(err => {
        console.log(err)
    })*/
})


var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`backend is running on http://localhost:${port}`);
})