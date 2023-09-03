const Shipper=require('./shippers-model') 

module.exports = {
  checkId,
  checkPayload,
}

 async function checkId(req, res, next) {
  try{
    const shipper=await Shipper.getById(req.params.id)
    if(shipper){
      req.shipper=shipper;
      next()
    }else{
      next({status:404,message:`Shipper ${req.params.id} not found`})
    }

  }catch(err){
    //catch 是处理在异地发送请求的过程中出现了问题
    next(err)
  }

 
}
//since we are not use the async request from database,
//so we do not need to add "try catch" to analysis this situation of sending requests
function checkPayload(req, res, next) {
  const { ShipperName, Phone }=req.body
  if ((ShipperName!==undefined &&
    typeof ShipperName==='string'&&
    ShipperName.trim().length) ||
     (Phone !== undefined &&
      typeof Phone === 'string' &&
      Phone.trim().length)){
      req.ShipperName=ShipperName.trim()
      req.Phone = Phone.trim()
      next()
    }else{
      next({status:422,message:'Phone and name are required'})
    }
  
  
}
