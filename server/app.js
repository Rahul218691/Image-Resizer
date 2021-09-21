const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(express.static('public'))


app.get('/api/:file',(req,res)=>{
	const {file} = req.params;
	const pathinfo = path.join(__dirname,'./public/download');
	fs.unlink(`${pathinfo}/${file}`,(error)=>{
		if(error) console.log(error);
	});
	res.json({});
})


app.use('/api',require('./routes/fileRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
	console.log(`App running on PORT ${PORT}`)
});