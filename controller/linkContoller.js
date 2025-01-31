const LinkModel=require('../model/linkModel');
const shortid = require('shortid');

module.exports={
    createShortLink:async(req,res)=>{
        const {originalUrl}=req.body;
        console.log('Received originalUrl:',originalUrl);
        if(!originalUrl){
            return res.status(400).json({error:'Original url is Required'});
        }
        try{
            const shortUrl = shortid.generate();
            const newLink = new LinkModel({originalUrl,shortUrl});
            await newLink.save();
            res.status(201).json({originalUrl,shortUrl});
        }catch(error){
            res.status(500).json({error:'Error creating short link'});
        }
    },
    redirectToOriginalLink: async(req,res)=>{
        const {shortUrl} = req.params;
        try{
            const link = await LinkModel.findOne({shortUrl});
            if(!link){
                return res.status(404).send('short Url is not found!');
            }
            res.redirect(301 , link.originalUrl);
            
        }catch(eror){
            res.status(500).send('Error redirecting link');

        }
    }

};





//const shurtUrlFunction = ()=>{
//    let str = "";
//    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for(let i=0;i<5;i++){
//       str+=chars.charAt(Math.floor(Math.random()*chars.length));
//   }
//    return str;
//};