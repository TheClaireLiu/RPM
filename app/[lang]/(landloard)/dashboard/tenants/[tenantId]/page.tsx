"use client";

import LoadingSection from "@/components/common/LoadingSection";
import { showToast } from "@/components/common/Toast";
import { fetchData } from "@/utils/http";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import Link from "next/link";
import usePropertyStore from "@/stores/propertyStore";
import RentForm from "@/components/rent/RentForm";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";



export default function TenantPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = params;

  const {t} = useAppStore();

  const {fetchRents, rents, setCurRent, curTenant, curRoom, curProperty, showRentForm, setShowRentForm, handleDeleteRent, setCurTenant} = usePropertyStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurTenant({_id:tenantId});
    fetchRents(tenantId);
  }, [tenantId,setCurTenant,fetchRents]);

  return (
    <>
      <LinkText
        className="page-title"
        href={`/dashboard/properties/${curProperty?._id}`}
        text={`${t('home.Property')}: ${curProperty?.name}`}
      />
      <LinkText className="page-title" href={`/dashboard/rooms/${curRoom?._id}`} text={`${t('home.Room')}: ${curRoom?.name}`} />

      <div className="flex justify-between">
        <h1 className="page-title">{t('home.Tenant')} {curTenant?.name}</h1>
        <Button tl={t('dashboard.AddRent')} handleClick={setShowRentForm} />
      </div>

      {showRentForm && <RentForm />}


      <LoadingSection loading={loading}>
        <section className="card-container">
          {rents.map(({ _id, amount, startDate, status, statusTxt }) => (
            <article className="card" key={_id}>
              <p className="rent-date">{startDate}</p>
              <div className="flex justify-between items-center my-2">
                <p className="text-xl font-semibold">${amount}</p>
                <p className={`rent-status ${statusTxt}`}>{t(statusTxt)}</p>
              </div>
              <div className="flex justify-between">
                <Button
                  tl={t('dashboard.Edit')}
                  handleClick={() =>{
                    setShowRentForm();
                    setCurRent({ _id, amount, startDate, status })
                  }
                  }
                />
                <Button
                  tp="danger"
                  tl={t('dashboard.Delete')}
                  handleClick={() => handleDeleteRent({tenantId, rentId:_id})}
                />
              </div>
            </article>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}
