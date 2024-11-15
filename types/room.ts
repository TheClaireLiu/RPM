import { Property } from "./property";

export interface Room {
  _id?: string;
  name?: string;
  property?: Property;
  tp?:string;
  tenant?:any;
}

interface ROOM_TP_MAP_TYPE {
  [key: string]: string
}

export const ROOM_TP_MAP:ROOM_TP_MAP_TYPE = {
  "1": "Room",
  "2": "Suite",
  "3": "Floor",
  "4": "Whole",
  "5": "Parking",
  "6": "Storage"
}

function convertMap2Array() {
  const arr = []
  for (const key in ROOM_TP_MAP) {
    arr.push({
      key: key,
      text: ROOM_TP_MAP[key]
    })
  }
  return arr
}

export const ROOM_TP_ARRAY = convertMap2Array();