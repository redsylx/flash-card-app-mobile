interface ICart {
  id: string,
  nItems: number
}

const defaultCart : ICart = {
  id: "",
  nItems: 0
}

export type {
  ICart
}

export {
  defaultCart
}