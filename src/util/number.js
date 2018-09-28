export const getPercent = (val, suffix = 1) => {
  let str = ''
  if(val){
    str = `${(Number(val) * 100).toFixed(suffix)}%`
  }
  return str
}