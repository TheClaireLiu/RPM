import Loading from "./Loading";

interface LoadingSectionProps {
  loading:boolean;
  children:React.ReactNode;
}

export default function LoadingSection({loading,children}:LoadingSectionProps) {
  return (
    <>
      {loading?<Loading />:children}
    </>
  )
}