interface FormTitleProps {
  title: string;
}

export default function FormTitle({ title }: FormTitleProps) {
  return (
    <h2 className="text-base font-semibold leading-7 text-gray-900">{title}</h2>
  );
}
