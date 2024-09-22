import IAccount, { defaultAccount } from "./IAccount"

interface ISellCardCategory {
  id: string,
  name: string,
  nCard: number,
  img: string,
  imgUrl: string,
  point: number,
  sold: number,
  description: string,
  createdTime: Date,
  account: IAccount
}

const defaultSellCardCategory : ISellCardCategory = {
  id: "",
  name: "",
  nCard: 0,
  img: "",
  imgUrl: "",
  point: 0,
  sold: 0,
  description: "",
  createdTime: new Date(),
  account: defaultAccount
}

export {
  defaultSellCardCategory
}

export type {
  ISellCardCategory
}