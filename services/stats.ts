import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";
import {RENT_STATUS, PENDING, PAID, CANCELLED} from "@/types/rent";
import Cost from "@/models/cost";
import { COST_TP_MAP } from "@/types/cost";

const getCurrentYearMonth = (date: string | undefined) => {
  if (date) {
    const currentYearMonth = date;
    let [year, month] = date.split("-");
    if (month === "12") {
      month = "01";
      year = String(Number(year) + 1);
    } else {
      const nextMonth = Number(month) + 1;
      month = nextMonth > 9 ? nextMonth.toString() : `0${nextMonth}`;
    }
    const nextYearMonth = year + "-" + month;
    return { currentYearMonth, nextYearMonth };
  } else {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const currentYearMonth = `${year}-${month > 9 ? month : "0" + month}`;

    let nextYearMonth = `${year}-${month + 1 > 9 ? month + 1 : "0" + (month + 1)}`;
    if (month === 12) {
      nextYearMonth = `${year + 1}-01`;
    }
    return { currentYearMonth, nextYearMonth };
  }
};

interface Stats {
  date?: string;
  userId?: string;
  propertyId?: string;
}

export const getStats = async ({ date, userId, propertyId }: Stats) => {
  const { currentYearMonth, nextYearMonth } = getCurrentYearMonth(date);

  let properties;
  const propertyQuery: any = {};
  if (userId) {
    propertyQuery.user = userId;
  } else {
    propertyQuery._id = propertyId;
  }
  properties = await Property.find(propertyQuery);

  const roomsQuery: any = {};
  const costQuery: any = {};
  if (userId) {
    const propertyIds = properties.map((prop: any) => prop._id);
    roomsQuery.property = { $in: propertyIds };
    costQuery.property = {$in:propertyIds};
  } else {
    roomsQuery.property = propertyId;
    costQuery.property = propertyId;
  }

  costQuery.date = { $gte: currentYearMonth, $lt: nextYearMonth };

  const costsResult = await Cost.find(costQuery);
  const costs = costsResult.map((cost) => {
    return {
      _id:cost._id,
      amount:cost.amount,
      date:cost.date,
      tp:cost.tp,
      tpTxt:COST_TP_MAP[cost.tp] || cost.tp
    }
  });


  const roomsResult = await Room.find(roomsQuery);
  const roomIds = roomsResult.map((room) => room._id);
  
  const tenants = await Tenant.find({ room: { $in: roomIds }, isCurrent: true });
  const tenantMap:{[key:string]:any} = {};
    tenants.forEach(tenant=>{
      tenantMap[tenant.room] = tenant;
    });
  const tenantIds = tenants.map((tenant) => tenant._id);

  const rooms = roomsResult.map(({_id,name,tp})=>{
    return {
      _id,name,tp,tenant:tenantMap[_id]
    };
  });

  const rents = await Rent.find({
    tenant: { $in: tenantIds },
    startDate: { $gte: currentYearMonth, $lt: nextYearMonth },
  });

  let totalRents = 0;
  let receivedRents = 0;
  let pendingRents = 0;
  const pendingRentTenants:any[] = [];
  rents.forEach((rent) => {
    const status = RENT_STATUS[rent.status] || rent.status;
    if (status === PAID) {
      receivedRents += rent.amount;
    } else if (status === PENDING) {
      pendingRents += rent.amount;

      pendingRentTenants.push({
        tenant: tenantMap[rent.room],
        amount: rent.amount
      });

    }
    totalRents += rent.amount;
  });

  const totalCost = costs.reduce((acc, cost)=>acc+cost.amount,0);

  return {date:currentYearMonth, properties, rooms, costs, totalCost, tenants, totalRents, receivedRents, pendingRents, pendingRentTenants };
};
