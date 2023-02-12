export const CartItemsIds=(data)=>{
    if(!data?.length) return []
  let Arr=[];
  for(let key of data){
    Arr.push(key?._id);
  }
  return Arr
}
export const totalAmountToPay=(data)=>{
      if (!data?.length) return 0;
    let s=0;
    for(let key of data){
        let x= +key?.price;
        s+=x
    }
    return s
}