import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}cart`

async function serviceCartGet(accessToken: string, accountId: string) {
  let url = `${base_url}?accountId=${encodeURIComponent(accountId)}`;
  const init = requestInit(accessToken);
  return await fetch(url, init);
}

export {
  serviceCartGet
}