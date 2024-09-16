interface ITransactionActivity {
  id: string,
  totalPoint: number,
  totalItem: number,
  createdTime: Date
}

const defaultTransactionActivity : ITransactionActivity = {
  id: "",
  totalPoint: 0,
  totalItem: 0,
  createdTime: new Date()
}

export {
  defaultTransactionActivity
}

export type {
  ITransactionActivity
}