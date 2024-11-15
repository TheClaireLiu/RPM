"use client";

import LinkText from "@/components/common/LinkText";
import LoadingSection from "@/components/common/LoadingSection";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";

export default function TenantsPage() {
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);
  const fetchTenants = async () => {
    setLoading(true);
    const { tenants } = await fetchData({ url: `/api/tenants` });
    if (tenants) {
      setTenants(tenants);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <>
      <h1 className="page-title">Tenants Page</h1>
      <LoadingSection loading={loading}>
        <section className="card-container">
          {tenants.map(({ _id, name, deposit }) => (
            <article className="card" key={_id}>
              <LinkText href={`/dashboard/tenants/${_id}`} text={name} />
              <p>Deposit: {deposit}</p>
            </article>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}
