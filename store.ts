import { create } from "zustand";
import IAccount, { defaultAccount } from "./interfaces/IAccount";

type AccountState = {
  account: IAccount;
  setAccount: (newAccount: IAccount) => void;
}

const useAccount = create<AccountState>((set) => ({
  account: defaultAccount,
  setAccount: (account) => set(() => ({ account })),
}));


type LoadingState = {
  isLoading: boolean;
  setLoading: (bool: boolean) => void;
}

const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (bool) => set(() => ({ isLoading: bool })),
}));

export {
  useAccount,
  useLoading
}