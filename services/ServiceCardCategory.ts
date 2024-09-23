import { customFetch, requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}cardCategory`

async function serviceCardCategoryGetList (accessToken: string, accountId: string) {
    const url = `${base_url}?accountId=${encodeURIComponent(accountId)}`;
    const init = requestInit(accessToken);
    return await fetch(url, init);
}

async function serviceCardCategoryCreate (accessToken: string, accountId: string, categoryName: string) {
    const url = `${base_url}?accountId=${encodeURIComponent(accountId)}&name=${encodeURIComponent(categoryName)}`;
    const init = requestInit(accessToken, 'POST');
    return await fetch(url, init);
}

async function serviceCardCategoryUpdate (accessToken: string, accountId: string, categoryId: string, newCategoryName: string) {
    const url = `${base_url}?accountId=${encodeURIComponent(accountId)}&categoryId=${encodeURIComponent(categoryId)}&newCategoryName=${newCategoryName}`;
    const init = requestInit(accessToken, 'PUT');
    return await fetch(url, init);
}

async function serviceCardCategoryDelete (accessToken: string, accountId: string, categoryId: string) {
    const url = `${base_url}?accountId=${encodeURIComponent(accountId)}&categoryId=${encodeURIComponent(categoryId)}`;
    const init = requestInit(accessToken, 'DELETE');
    return await fetch(url, init);
}

async function serviceCardCategoryConvert (accessToken: string, accountId: string, sellCardCategoryId: string, newCategoryName: string) {
    const url = `${base_url}/convert?accountId=${encodeURIComponent(accountId)}&sellCardCategoryId=${encodeURIComponent(sellCardCategoryId)}&newCategoryName=${encodeURIComponent(newCategoryName)}`;
    const init = requestInit(accessToken);
    return await customFetch(url, init);
}

export {
    serviceCardCategoryGetList,
    serviceCardCategoryCreate,
    serviceCardCategoryUpdate,
    serviceCardCategoryDelete,
    serviceCardCategoryConvert
}