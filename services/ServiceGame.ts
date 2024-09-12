import { ICreateGameDto } from "../interfaces/IGame";
import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}game`

async function serviceGameGet (accessToken: string, accountId: string, gameId: string) {
    let url = `${base_url}?accountId=${encodeURIComponent(accountId)}&gameId=${encodeURIComponent(gameId)}`;
    const init = requestInit(accessToken);
    return await fetch(url, init);
}

async function serviceGameGetList (accessToken: string, accountId: string) {
  let url = `${base_url}/list?ispaged=false&accountId=${encodeURIComponent(accountId)}`;
  const init = requestInit(accessToken);
  return await fetch(url, init);
}

async function serviceGameGetResume (accessToken: string, accountId: string) {
  let url = `${base_url}/resume?accountId=${encodeURIComponent(accountId)}`;
  const init = requestInit(accessToken);
  return await fetch(url, init);
}

async function serviceGameCreate(accessToken: string, dto: ICreateGameDto) {
    const url = `${base_url}`;
    const init = requestInit(accessToken, 'POST');
    init.body = JSON.stringify(dto);
    return await fetch(url, init);
}

async function serviceGameFinish(accessToken: string, gameId: string) {
  let url = `${base_url}/finish?gameId=${encodeURIComponent(gameId)}`;
  const init = requestInit(accessToken, 'put');
  return await fetch(url, init);
}

export {
  serviceGameGet,
  serviceGameCreate,
  serviceGameFinish,
  serviceGameGetResume,
  serviceGameGetList
}