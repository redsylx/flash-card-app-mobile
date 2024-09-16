import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}cartDetail`

async function serviceCartDetailAdd(accessToken: string, cartId: string, sellCategoryId: string) {
  let url = `${base_url}?cartId=${encodeURIComponent(cartId)}&sellCardCategoryId=${encodeURIComponent(sellCategoryId)}`;
  const init = requestInit(accessToken, 'post');
  return await fetch(url, init);
}

async function serviceCartDetailRemove(accessToken: string, cartId: string, sellCategoryId: string) {
  let url = `${base_url}?cartId=${encodeURIComponent(cartId)}&sellCardCategoryId=${encodeURIComponent(sellCategoryId)}`;
  const init = requestInit(accessToken, 'delete');
  return await fetch(url, init);
}

async function serviceCartDetailGet(accessToken: string, cartId: string) {
  let url = `${base_url}?cartId=${encodeURIComponent(cartId)}`;
  const init = requestInit(accessToken);
  return await fetch(url, init);
}

export {
  serviceCartDetailGet,
  serviceCartDetailAdd,
  serviceCartDetailRemove
}