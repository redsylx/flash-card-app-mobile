import { create } from "zustand";
import IAccount, { defaultAccount } from "./interfaces/IAccount";
import ICardCategory, { defaultCardCategory } from "./interfaces/ICardCategory";
import ICard, { defaultCard } from "./interfaces/ICard";
import { defaultSellCardCategory, ISellCardCategory } from "./interfaces/ISellCardCategory";
import { defaultSellCard, ISellCard } from "./interfaces/ISellCard";

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

interface IDropdownState {
  prevSelectedCardCategory: ICardCategory;
  selectedCardCategory: ICardCategory;
  selectedCardCategories: ICardCategory[];
  cardCategories: ICardCategory[];
  searchTerm: string;
  cardCategoriesToShow: ICardCategory[];
  isOpen: boolean;
  refresh: boolean;

  setPrevSelectedCardCategory: (cardCategory: ICardCategory) => void;
  setSelectedCardCategory: (cardCategory: ICardCategory) => void;
  setSelectedCardCategories: (cardCategories: ICardCategory[]) => void;
  setCardCategories: (cardCategories: ICardCategory[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  setCardCategoriesToShow: (cardCategories: ICardCategory[]) => void;
  setIsOpen: (isOpen: boolean) => void;
  setRefresh: (refresh: boolean) => void;
}

const createDropdownStore = () => create<IDropdownState>((set) => ({
  prevSelectedCardCategory: defaultCardCategory,
  selectedCardCategory: defaultCardCategory,
  selectedCardCategories: [],
  cardCategories: [],
  searchTerm: "",
  cardCategoriesToShow: [],
  isOpen: false,
  refresh: false,
  setPrevSelectedCardCategory: (prevSelectedCardCategory) => set(() => ({ prevSelectedCardCategory })),
  setSelectedCardCategory: (selectedCardCategory) => set(() => ({ selectedCardCategory })),
  setSelectedCardCategories: (selectedCardCategories) => set(() => ({ selectedCardCategories })),
  setCardCategories: (cardCategories) => set(() => ({ cardCategories })),
  setSearchTerm: (searchTerm) => set(() => ({ searchTerm })),
  setCardCategoriesToShow: (cardCategoriesToShow) => set(() => ({ cardCategoriesToShow })),
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
  setRefresh: (refresh) => set(() => ({ refresh })),
}));

// Use the factory function to create two separate stores
const useHomeDropdown = createDropdownStore();

interface ICardState<T> {
  item: T;
  items: T[];
  openedItem: T;
  prevOpenedItem: T;
  refresh: boolean;
  setItem: (item: T) => void;
  setItems: (item: T[]) => void;
  setOpenedItem: (item: T) => void;
  setRefresh: (item: boolean) => void;
}

const createStoreCardStateCard = () => create<ICardState<ICard>>((set) => ({
  item: defaultCard,
  items: [],
  openedItem: defaultCard,
  prevOpenedItem: defaultCard,
  refresh: false,
  setItem: (item) => set({ item }),
  setItems: (items) => set({ items }),
  setOpenedItem: (openedItem) => set((state) => ({
    prevOpenedCard: state.openedItem,
    openedItem
  })),
  setRefresh: (refresh: boolean) => set({ refresh: refresh }),
}));

const useHomeCard = createStoreCardStateCard();

const createStoreCardStateSellCardCategory = () => create<ICardState<ISellCardCategory>>((set) => ({
  item: defaultSellCardCategory,
  items: [],
  openedItem: defaultSellCardCategory,
  prevOpenedItem: defaultSellCardCategory,
  refresh: false,
  setItem: (item) => set({ item }),
  setItems: (items) => set({ items }),
  setOpenedItem: (openedItem) => set((state) => ({
    prevOpenedCard: state.openedItem,
    openedItem
  })),
  setRefresh: (refresh: boolean) => set({ refresh: refresh }),
}));

const useStoreCard = createStoreCardStateSellCardCategory();

const createStoreCardStateSellCard = () => create<ICardState<ISellCard>>((set) => ({
  item: defaultSellCard,
  items: [],
  openedItem: defaultSellCard,
  prevOpenedItem: defaultSellCard,
  refresh: false,
  setItem: (item) => set({ item }),
  setItems: (items) => set({ items }),
  setOpenedItem: (openedItem) => set((state) => ({
    prevOpenedCard: state.openedItem,
    openedItem
  })),
  setRefresh: (refresh: boolean) => set({ refresh: refresh }),
}));

const useStoreDetailCard = createStoreCardStateSellCard();

export type { IDropdownState };

export {
  useAccount,
  useLoading,
  useHomeDropdown,
  useHomeCard,
  useStoreCard,
  useStoreDetailCard
}