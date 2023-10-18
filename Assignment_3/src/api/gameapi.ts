import {GameData} from '../models/gameData'
const PATH = `http://localhost:9090/`
// must be handled with tokens

interface FetchAsyncOptions {
    headers?: Record<string, string>
    url: string
}

interface ModifyFetchAsyncOptions extends FetchAsyncOptions {
    data?: any
}


async function getFetchAsync({url}: FetchAsyncOptions) {
    const response = await fetch(url, { method: 'GET' })

    if (!response.ok) {
        console.log(response.statusText)
    }

    return await response.json()
}
	
async function postFetchAsync({ data, url }: ModifyFetchAsyncOptions): Promise<any> {
    const headers = { "Content-Type": "application/json", Accept: "application/json" }
    const json = JSON.stringify(data)
    const response = await fetch(url, { headers, method: "POST", body: json })
  
    if (!response.ok) {
        console.log(response.statusText)
    }
  
    return await response.json()
}

async function patchFetchAsync({data, url}: ModifyFetchAsyncOptions): Promise<any> {
    const headers = { "Content-Type": "application/json", Accept: "application/json" }
    const json = JSON.stringify(data)
    const response = await fetch(url, { headers, method: "PATCH", body: json })
    if (!response.ok) {
        console.log(response.statusText)
    }
  
    return response.json()
}

export async function getAllUserGames(token: string) {
    const url = `${PATH}${`games?token=`}` + token
    const response = await getFetchAsync({url})
    if(!response.ok) {
        console.log(response.statusText)
        return
    }
    return await response.json()
}

export async function createGame(token: string) {
    // Not sure if we should include a body here bcs it says the request body is ignored?
    const url = `${PATH}${`games?token=`}` + token
    const response = await postFetchAsync({url})
    if(!response.ok) {
        console.log(response.statusText)
        return
    }
    return await response.json()
}

export async function updateGame(id: number, token: string, gameData: GameData) {
    const url = `${PATH}${`games/`+ id + `?token=` + token}`
    const data = JSON.stringify(gameData)
    const response = await patchFetchAsync({data, url})
    if(!response.ok) {
        console.log(response.statusText)
        return
    }
    return await response.json()
}

export async function createUser(username: string, password: string) {
    const url = `${PATH}users`
    const data = {username, password}
    const response = await postFetchAsync({data, url})
    if(!response.ok) {
        console.log(response.statusText)
        return
    }
    return await response.json()
}

export async function loginUser(username: string, password: string) {
    const url = `${PATH}login`
    const data = {username, password}
    const response = await postFetchAsync({data, url})
    if(!response.ok) {
        console.log(response.statusText)
        return
    }
    return await response.json()
}

