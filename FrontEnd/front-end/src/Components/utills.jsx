export const CartItemsIds=(data)=>{
  let Arr=[];
  for(let key of data){
    Arr.push(key?._id);
  }
  return Arr
}