import { showToast } from '@/components/common/Toast';import { translates } from '@/constants/locales';
import { create } from 'zustand'

interface AppState {
  curLocale:string
  setLocale:(locale:string)=>void;
  t:(key:string) => string;
}

const useAppStore = create<AppState>((set, get) => ({
  curLocale: 'en-CA',
  setLocale: (locale:string) => {
    localStorage.setItem('locale',locale);
    set({curLocale:locale})
  },
  t: (key:string) => {
    const trans = translates[get().curLocale];
    const keyArray = key.split('.');
    
    let result = trans;

    keyArray.forEach(field => {
      result = result[field];
    });

    return result;
  }
}));

export default useAppStore;