"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "@/components/common/Toast";
import { RENT_STATUS_ARRAY } from "@/types/rent";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SelectGroup from "@/components/common/SelectGroup";
import FormBackdrop from "@/components/common/form/FormBackdrop";
import FormTitle from "@/components/common/form/FormTitle";
import useAppStore from "@/stores/appStore";


const RENT_FIELDS = [
  { placeholder: "Amount", name: "amount", inputType: "number" },
  { placeholder: "Date", name: "startDate", inputType: "date" },
];

export default function RentForm() {
  const {t} = useAppStore();
  const { curRent, setCurRent, curTenant, handleRentSubmit, setShowRentForm } = usePropertyStore();

  return (
    <FormBackdrop>
      <form
        className="form-container"
        onSubmit={handleRentSubmit}
      >
        <FormTitle title="Add New Rent" />
        {RENT_FIELDS.map(({ placeholder, inputType, name }) => (
          <Input
            key={name}
            placeholder={placeholder}
            value={curRent[name] || ""}
            type={inputType}
            onChange={(e) => setCurRent({ ...curRent, [name]: e.target.value })}
          />
        ))}
        <SelectGroup
          value={curRent.status || ""}
          label="Rent Status"
          options={RENT_STATUS_ARRAY}
          handleSelect={(value) => setCurRent({ ...curRent, status: value })}
        />
        <div className="flex justify-between">
          <Button tl={curRent._id?t('dashboard.Update'):t('dashboard.Add')} handleClick={()=>{}} />
          <Button tl={t('dashboard.Cancel')} handleClick={()=>{
            setShowRentForm();
          }} tp="danger" />
        </div>
      </form>
    </FormBackdrop>
  );
}
