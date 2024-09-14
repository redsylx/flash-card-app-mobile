import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}sellCard`

async function serviceSellCardGetList (accessToken: string, sellCategoryId: string, ...filters: string[]) {
  let url = `${base_url}/list?sellCardCategoryId=${encodeURIComponent(sellCategoryId)}&${filters.join('&')}`;
  const init = requestInit(accessToken);
  return await fetch(url, init);
}

export {
  serviceSellCardGetList
}