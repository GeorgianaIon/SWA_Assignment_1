import { GameModel, UserModel } from '../models/apiModels'
const PATH = `http://localhost:9090/`
const headers = { "Content-Type": "application/json", Accept: "application/json" }

interface FetchAsyncOptions {
    headers?: Record<string, string>
    url: string
}

interface ModifyFetchAsyncOptions extends FetchAsyncOptions {
    data?: any
}


async function getFetchAsync({url}: FetchAsyncOptions) : Promise<any> {
    const response = await fetch(url, { method: 'GET' })

    if (!response.ok) {
        console.log(response.statusText)
    }

    return response
}
	
async function postFetchAsync({ data, url }: ModifyFetchAsyncOptions): Promise<any> {
    const json = JSON.stringify(data)
    const response = await fetch(url, { headers, method: "POST", body: json })
  
    if (!response.ok) {
        console.log(response.statusText)
    }
  
    return response
}

async function patchFetchAsync({data, url}: ModifyFetchAsyncOptions): Promise<any> {
    const json = JSON.stringify(data)
    const response = await fetch(url, { headers, method: "PATCH", body: json })
    if (!response.ok) {
        console.log(response.statusText)
    }
  
    return response
}

export async function createUser(username: string, password: string) {
    const url = `${PATH}users`
    const data = {username, password}
    const response = await postFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function loginUser(username: string, password: string) {
    const url = `${PATH}login`
    const data = {username, password}
    const response = await postFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function logoutUser(token: string) {
    const url = `${PATH}${`logout?token=`}` + token
    const data = {}
    const response = await postFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return await response
}

export async function getAllUsers(token: string) {
    const url = `${PATH}${`users?token=`}` + token
    const response = await getFetchAsync({url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function getUser(token: string, id: number) {
    const url = `${PATH}${`users/${id}?token=`}` + token
    const response = await getFetchAsync({url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function updateUser(token: string, user: UserModel) {
    const url = `${PATH}/${`users/`+ user.id + `?token=` + token}`
    const data = JSON.stringify(user)
    const response = await patchFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function getAllGames(token: string) {
    const url = `${PATH}${`games?token=`}` + token
    const response = await getFetchAsync({url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function createGame(token: string) {
    const url = `${PATH}${`games?token=`}` + token
    const data = {}
    const response = await postFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function getGame(token: string, game: GameModel) {
    const url = `${PATH}${`games/${game.id}?token=`}` + token
    const response = await getFetchAsync({url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function updateGame<T>(token: string, game: GameModel) {
    const url = `${PATH}/${`games/`+ game.id + `?token=` + token}`
    const data = JSON.stringify(game)
    const response = await patchFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return await response.json()
}