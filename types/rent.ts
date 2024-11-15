export interface Rent {
  // _id?: string;
  // amount?: string;
  // status?: string;
  // date?: string;
  [key:string]: string;
}

interface RentStatus {
  [key: string]: string;
}

export const PENDING = "pending";
export const PAID = "paid";
export const CANCELLED = "cancelled";

export const RENT_STATUS: RentStatus = {
  1: PENDING,
  2: PAID,
  // 3: CANCELLED,
}

function getRentStatusArray() {
  return Object.keys(RENT_STATUS).map((key) => {
    return {
      key,
      text: RENT_STATUS[key],
    };
  });
}

export const RENT_STATUS_ARRAY = getRentStatusArray();