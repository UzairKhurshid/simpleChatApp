const express=require('express')
const router=new express.Router()


router.get('/userIndex',(req,res)=>{
    res.render('user/index',{
        title:'User Dashboard'
      })
})



module.exports=router