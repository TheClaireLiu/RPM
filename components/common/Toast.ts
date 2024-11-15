import {
  toast,
  ToastContent,
  ToastOptions,
  Slide,
  Id,
  Bounce,
} from "react-toastify";

export const showToast = (content:string) => {
  toast(content, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}