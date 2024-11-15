"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "../common/Toast";
import { EMPTY_PROPERTY, Property, PROPERTY_PTYPE_ARRAY } from "@/types/property";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SelectGroup from "../common/SelectGroup";
import FormBackdrop from "../common/form/FormBackdrop";
import FormTitle from "../common/form/FormTitle";
import useAppStore from "@/stores/appStore";

interface PropertyFormProps {
  showPropertyForm: Function;
  property: Property;
}

export default function PropertyForm({
  showPropertyForm,
  property,
}: PropertyFormProps) {
  const {t} = useAppStore();
  const { fetchProperties } = usePropertyStore();

  const [curProperty, setCurProperty] = useState<Property>(property);

  useEffect(() => setCurProperty(property), [property]);

  const handlePropertySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = curProperty._id ? "PUT" : "POST";
    const url = curProperty._id
      ? `/api/properties/${curProperty._id}`
      : `/api/properties`;
    const { msg, err } = await fetchData({ url, method, body: curProperty });
    showPropertyForm(false);
    showToast(err || msg);
    fetchProperties();
    setCurProperty(EMPTY_PROPERTY);
  };

  return (
    <FormBackdrop>
      <form
        className="form-container"
        onSubmit={handlePropertySubmit}
      >
        <Input
          type="text"
          placeholder={t('dashboard.Name')}
          value={curProperty.name || ""}
          onChange={(e) =>
            setCurProperty({ ...curProperty, name: e.target.value })
          }
        />
        <SelectGroup
          value={curProperty.ptype || ""}
          label="Property Type"
          options={PROPERTY_PTYPE_ARRAY}
          handleSelect={(value) =>
            setCurProperty({ ...curProperty, ptype: value })
          }
        />
        <div className="flex justify-between">
          <Button tl={t(curProperty._id?'dashboard.Update':'dashboard.Add')} handleClick={handlePropertySubmit} />
          <Button tl={t('dashboard.Cancel')} handleClick={()=>{
            setCurProperty(EMPTY_PROPERTY);
            showPropertyForm(false);
          }} tp="danger" />
        </div>
      </form>
    </FormBackdrop>
  );
}
