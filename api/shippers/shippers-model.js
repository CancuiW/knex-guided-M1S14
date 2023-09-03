const db=require('./../../data/db-config')


module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  // .select('shippername','phone') --->returns only this two atributes in the final array
  const result= await db('shippers')
                       // .select('shippername','phone')
  return result
}

async function getById(id) {
  //写法1:const result=await db('shippers').where({shipperID:id}) 
  //写法2:因为只有一个attribute 所以有另一种写法  const result=await db('shippers').where(shipperID，id) 
  //if the id is not in the table,it will return [],so we can destructure(解构) this array that will return anything 
  //for instance :
  // const [result] = await db('shippers').where('shipperID', id )
  // return result
  //another way is to add '.first()' at the end of the line to solve the problem of returning []
  const result = await db('shippers').where('shipperID', id).first()
   return result

}

async function create(newshipper) {
  const [newIndexOfItem]=await db('shippers').insert(newshipper)
  //return [6] --->6 is the index of new item
  // so we need to use the getById() to get this new item
  const result= await getById(newIndexOfItem)
  return result
}

async function update(updateId,newItem) {
   await db('shippers').where('shipperID', updateId ).update(newItem)
   //return the count of changeItem ,so we need to use the getById() to get this new item
  const result = await getById(updateId)
  return result
}

async function remove(id) {
  const result = await getById(id)
  await db('shippers').where('shipperID', id).del()
  
  return result
}
