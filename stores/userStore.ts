import { showToast } from '@/components/common/Toast';
import { USER_DETAIL, USER_LOGIN } from '@/constants/apis';
import { fetchData } from '@/utils/http';
import { create } from 'zustand'

interface User {
  _id?:string;
  email: string;
  password?: string;
}

interface UserState {
  loginUser: any,
  login: (user: User) => any,
  fetchUser:() => void;
  logout:()=>void;
}

const useUserStore = create<UserState>((set, get) => ({
  loginUser: {},
  login: async ({email,password}) => {
    const {token,err,locale} = await fetchData({url:USER_LOGIN,method:'POST',body:{email,password}});
    if (token) {
      localStorage.setItem("auth-token", token);
      localStorage.setItem('locale',locale);
      showToast("Login Successful");
      get().fetchUser();
    } else {
      showToast(err);
    }
    return {err,locale};
  },
  fetchUser: async () => {
    if (!localStorage.getItem("auth-token")) return;
    const {user, err} = await fetchData({method:'POST',url:USER_DETAIL,body:{locale:localStorage.getItem('locale')}});
    if (err) {
      showToast(err);
    } else {
      set({loginUser:user});
    }
  },
  logout: () => {
    localStorage.setItem('auth-token','');
    set({ loginUser: {} })
  },
}))

export default useUserStore;