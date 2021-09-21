const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const fileConverter = async(req,res) =>{
	try {
		if(!req.file){
			return res.status(400).json({msg:'Please Choose a file to convert'});
		}
		let {height,width,to} = req.body;
			height = height ? parseInt(height) : 256;
			width = width ? parseInt(width) : 256;
			if(to === 'ico'){
				height = 64;
				width = 64;
			}
			const pathdata = path.join(__dirname,'../public/uploads');
			const writepath = path.join(__dirname,'../public/download');
			const filenamedata = req.file.filename.match(/[^\.]+/);
			const file = `${pathdata}/${req.file.filename}`;
			const image = await Jimp.read(file);
			await image.resize(width,height);
			await image.quality(60);
			await image.write(`${writepath}/${filenamedata[0]}.${to}`);
			fs.unlink(`${pathdata}/${req.file.filename}`,(err)=>{
				if(err) console.log(err);
			});
			res.json({
				msg:'Converted',
				file:`${filenamedata[0]}.${to}`,
				fileurl:`${writepath}/${filenamedata[0]}.${to}`
			})	
	} catch(err) {
		return res.status(500).json({msg:err.message})
	}
}


module.exports = {
	fileConverter
}