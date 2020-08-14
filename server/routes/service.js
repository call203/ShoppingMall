const express = require('express');
const router = express.Router();
const {FAQ} = require('../models/FQA');

//=================================
//             FAQ
//=================================


router.post('/faq/write',(req,res)=>{
    //가져온 이미지를 저장
    const faq = new FAQ(req.body)
    faq.save((err =>{
        if(err) return res.status(400).jsoin({success:false})
        return res.status(200).json({success:true})
    }))
    
})


router.post('/faq/getboard',(req,res)=>{
  
    FAQ.find().exec((err, Info)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, Info, boardSize:Info.length})
    })
    
})


module.exports = router;