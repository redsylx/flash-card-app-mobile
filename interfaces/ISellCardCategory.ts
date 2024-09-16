interface ISellCardCategory {
  id: string,
  name: string,
  nCard: number,
  img: string,
  imgUrl: string,
  point: number,
  sold: number,
  description: string,
  createdTime: Date
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
  createdTime: new Date()
}

export {
  defaultSellCardCategory
}

export type {
  ISellCardCategory
}