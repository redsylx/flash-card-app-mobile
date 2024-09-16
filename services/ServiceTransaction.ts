import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}transactionactivity`

async function serviceTransactionCheckout(accessToken: string, accountId: string, cartId: string) {
  let url = `${base_url}?accountId=${encodeURIComponent(accountId)}&cartId=${encodeURIComponent(cartId)}`;
  const init = requestInit(accessToken, 'post');
  return await fetch(url, init);
}

async function serviceTransactionGetList(accessToken: string, accountId: string, ...filters: string[]) {
  let url = `${base_url}?accountId=${encodeURIComponent(accountId)}&${filters.join('&')}`;
  const init = requestInit(accessToken);
  return await fetch(url, init);
}

export {
  serviceTransactionCheckout,
  serviceTransactionGetList
}