export interface Cost {
  _id?:string;
  amount?:string;
  date?:string;
  tp?:string;
  tpTxt?:string;
  user?:string;
  property?:string;
} 

interface COST_TP_MAP_TYPE {
  [key: string]: string
}

export const COST_TP_MAP:COST_TP_MAP_TYPE = {
  "1": "Water",
  "2": "Electricity",
  "3": "gas",
  "4": "internet",
  "5": "repairment"
}

function convertMap2Array() {
  const arr = []
  for (const key in COST_TP_MAP) {
    arr.push({
      key: key,
      text: COST_TP_MAP[key]
    })
  }
  return arr
}

export const COST_TP_ARRAY = convertMap2Array();