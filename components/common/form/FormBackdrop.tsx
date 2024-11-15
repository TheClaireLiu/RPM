interface FormBackdropProps {
  children:React.ReactNode;
}

export default function FormBackdrop({children}:FormBackdropProps) {
  return (
    <section className="bg-slate-950/[0.6] z-10 fixed flex flex-col w-full h-full justify-center items-center top-0 left-0">
      {children}
    </section>
  )
}