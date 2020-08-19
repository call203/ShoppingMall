const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') //저장된 파일이 저장될 폴더
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}_${file.originalname}`)
    }
  })
   
var upload = multer({ storage : storage }).single("file")


router.post('/image',(req,res)=>{
    //가져온 이미지를 저장
    upload(req,res,err=>{
        if(err){
            return res.json({success:false, err})
        }
        return res.json({success:true, filePath: res.req.file.path, fileName:res.req.file.filename})    
    })
    
})


router.post('/',(req,res)=>{
    //받아온 정보들을 DB에 넣어준다.
    console.log(req.body)
    const product = new Product(req.body)
    
    product.save((err =>{
        if(err) return res.status(400).json({success:false})
        return res.status(200).json({success:true})
    }))

})


router.post('/products',(req,res)=>{

    /*더보기 버튼*/
    /*limit이 있다면 원래, 없다면 100으로 설정*/
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm;
    let findArgs={};

    for(let key in req.body.filters){
      if(req.body.filters[key].length >0){

          if(key ==='Price'){
            findArgs[key]={
              /*MongoDB's*/
              //받아온 원소보다 크거나 같은
              $gte:req.body.filters[key][0],
              //받아온 원소보다 작거나 같은
              $lte:req.body.filters[key][1]
            }
          }else{
            findArgs[key] = req.body.filters[key];
          }
      
      }
    }

    //검색기능
    if(term){
       //받아온 정보들을 DB에 넣어준다.
      Product.find(findArgs).find({"title":{ '$regex':term }}).populate("writer").skip(skip).limit(limit).exec((err, Info)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, Info, postSize:Info.length})
    })
      
    }else{
        //받아온 정보들을 DB에 넣어준다.
      Product.find(findArgs).populate("writer").skip(skip).limit(limit).exec((err, Info)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, Info, postSize:Info.length})
  })

    }

   
  })


  //상세 페이지
  
  router.get('/product_by_id', (req,res)=>{
      //product와 같은 id의 상품을 가져온다.

      let type = req.query.type
      let productId = req.query.id

     

      Product.find({_id:productId}).populate('writer').exec((err, product)=>{
        if(err){
          return res.status(400).send(err)
        } 
        else{



          Product.updateOne({ _id : productId },{$inc:{views:1}}).then(result=>{
            if(result){
              console.log("true")
            }else{
              console.log("false")
            }
            
          }).catch((err) => {
            console.log('Error: ' + err);
        })
    

          return res.status(200).send({success:true, product})
        } 
      })

      

  })
   



module.exports = router;


