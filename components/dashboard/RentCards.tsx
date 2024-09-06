"use client";

import { useEffect, useState } from "react";
import LoadingSection from "../common/LoadingSection";
// import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";
import usePropertyStore from "@/stores/propertyStore";
import useAppStore from "@/stores/appStore";

interface RentCardsProps {
  propertyId?: string;
}
//export RentCards
export default function RentCards({ propertyId }: RentCardsProps) {

  const {t} = useAppStore();

  const {fetchPropertyStats, rentStats,properties,rooms,tenants} = usePropertyStore();

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");

  const fetchProperty = async (date:string) => {
    setLoading(true);

    await fetchPropertyStats({propertyId, selectDate:date});

    setLoading(false);
  };

  useEffect(() => {
    fetchProperty(date);
  }, [date]);

  return (
    <>
      <Input type="month" value={rentStats.date||''} placeholder={"Select a month"} onChange={(e)=>setDate(e.target.value)} />
      <LoadingSection loading={loading}>
        <section className="card-container grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <article className="card">
            {properties && <p><span className="rent-price">{properties.length}</span> {t('home.Properties')}</p>}
            {rooms && <p><span className="rent-price">{rooms.length}</span> {t('home.Rooms')}</p>}
            {tenants && <p><span className="rent-price">{tenants.length}</span> {t('home.Tenants')}</p>}
          </article>
          <article className="card text-yellow-600">
            <p>{t('dashboard.TotalRents')}</p>
            <p className="rent-price">${rentStats.totalRents}</p>
          </article>
          <article className="card text-green-600">
            <p>{t('dashboard.ReceivedRents')}</p>
            <p className="rent-price">${rentStats.receivedRents}</p>
          </article>
          <article className="card text-red-600">
            <p>{t('dashboard.PendingRents')}</p>
            <p className="rent-price">${rentStats.pendingRents}</p>
            {rentStats.pendingRentTenants?.map(({tenant,amount})=>
              <div key={tenant._id}>{tenant.name} ${amount}</div>
            )}
          </article>
          <article className="card text-red-400">
            <p>{t('dashboard.TotalCosts')}</p>
            <p className="rent-price">${rentStats.totalCost}</p>
          </article>
        </section>
      </LoadingSection>
    </>
  );
}
