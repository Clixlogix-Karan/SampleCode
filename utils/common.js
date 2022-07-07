import millify from "millify"

export const shortStr=(name)=>(name+"")?.length < 10 ? name : (name + "")?.substring(0, 10) + "..."


export const shortNum = (NUM)=>{
    return parseFloat(NUM)>1000?millify(NUM):NUM
  }


export const objGetFromArray = (arr = []) => arr?.length > 0 ? arr[0] : {}


export const parseDate = (d)=>{
  const date = new Date(d)
  const y = date.getFullYear()
  const m = date.getMonth()
  const c_date = date.getDate()
  return date
}