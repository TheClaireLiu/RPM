import useAppStore from "@/stores/appStore";

interface Option {
  key: string;
  text: string;
}

interface SelectGroupProps {
  label: string;
  options: Option[];
  value: string;
  handleSelect: (value: string) => void;
}

export default function SelectGroup({
  label,
  options,
  value,
  handleSelect,
}: SelectGroupProps) {
  const {t} = useAppStore();
  return (
    <section className="select-options-container">
      {options.map(({ key, text }) =>
        <span
          key={key}
          className={`select-option ${(value === key) ? "active" : ""}`}
          onClick={() => handleSelect(key)}
        >
          {t(text)}
        </span>
      )}
    </section>
  );
}
