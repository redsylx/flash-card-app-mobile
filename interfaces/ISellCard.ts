import { defaultSellCardCategory, ISellCardCategory } from "./ISellCardCategory";

interface ISellCard {
  clueTxt: string;
  clueImg: string;
  clueImgUrl: string;
  nFrequency: number;
  nCorrect: number;
  pctCorrect?: number;
  id: string;
  descriptionTxt: string;
  categoryName: string;
  cardCategory: ISellCardCategory;
  createdTime: Date
}

const defaultSellCard: ISellCard = {
  clueImg: "",
  clueImgUrl: "",
  clueTxt: "",
  descriptionTxt: "",
  id: "0",
  nCorrect: 0,
  nFrequency: 0,
  categoryName: "",
  cardCategory: defaultSellCardCategory,
  createdTime: new Date(),
}

export {
  defaultSellCard
}

export type {
  ISellCard
}