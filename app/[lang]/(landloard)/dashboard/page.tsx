"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Map from "@/components/common/Map";
import RentCards from "@/components/dashboard/RentCards";

export default function Dashboard() {
  return (
    <>
      <h1 className="page-title">Dashboard</h1>

      <RentCards propertyId={""} />
      {/* <Map /> */}
    </>
  );
}
