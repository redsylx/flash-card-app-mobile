import { create } from "zustand";
import IAccount, { defaultAccount } from "./interfaces/IAccount";
import ICardCategory, { defaultCardCategory } from "./interfaces/ICardCategory";
import ICard, { defaultCard } from "./interfaces/ICard";

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

interface ICardState {
  selectedCard: ICard;
  cards: ICard[];
  openedCard: ICard;
  prevOpenedCard: ICard;
  refresh: boolean;
  setSelectedCard: (card: ICard) => void;
  setCards: (cards: ICard[]) => void;
  setOpenedCard: (card: ICard) => void;
  setRefresh: (refresh: boolean) => void;
}

const useHomeCard = create<ICardState>((set) => ({
  selectedCard: defaultCard,
  cards: [],
  openedCard: defaultCard,
  prevOpenedCard: defaultCard,
  refresh: false,

  setSelectedCard: (card: ICard) => set({ selectedCard: card }),
  setCards: (cards: ICard[]) => set({ cards: cards }),
  setOpenedCard: (card: ICard) => set((state) => ({
    prevOpenedCard: state.openedCard,
    openedCard: card
  })),
  setRefresh: (refresh: boolean) => set({ refresh: refresh }),
}));

export type { IDropdownState };

export {
  useAccount,
  useLoading,
  useHomeDropdown,
  useHomeCard
}