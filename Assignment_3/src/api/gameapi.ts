import { GameModel, LoginModel, UserModel } from '../models/apiModels'
import * as BoardModel from '../models/board'

const PATH = `http://localhost:9090`
const headers = { "Content-Type": "application/json", Accept: "application/json" }

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

    return response
}
	
async function postFetchAsync({ data, url }: ModifyFetchAsyncOptions) {
    const json = JSON.stringify(data)
    const response = await fetch(url, { headers, method: "POST", body: json })
  
    if (!response.ok) {
        console.log(response.statusText)
    }
  
    return response
}

async function patchFetchAsync({data, url}: ModifyFetchAsyncOptions) {
    const json = JSON.stringify(data)
    const response = await fetch(url, { headers, method: "PATCH", body: json })

    if (!response.ok) {
        console.log(response.statusText)
    }
  
    return response
}

export async function createUser(username: string, password: string): Promise<UserModel> {
    const url = `${PATH}/users`
    const data = {username, password}
    const response = await postFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function loginUser(username: string, password: string): Promise<LoginModel> {
    const url = `${PATH}/login`
    const data = {username, password}
    const response = await postFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function logoutUser(token: string) {
    const url = `${PATH}/logout?token=${token}`
    const data = {}
    const response = await postFetchAsync({data, url})
    return response
}

export async function getAllUsers(token: string): Promise<UserModel[]> {
    const url = `${PATH}/users?token=${token}`
    const response = await getFetchAsync({url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function getUser(token: string, id: number): Promise<UserModel> {
    const url = `${PATH}/users/${id}?token=${token}`
    const response = await getFetchAsync({url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function updateUser(token: string, user: UserModel) {
    const url = `${PATH}/users/${user.id}?token=${token}`
    const data = user
    const response = await patchFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return response
}

export async function getAllGames(token: string): Promise<GameModel[]> {
    const url = `${PATH}/games?token=${token}`
    const response = await getFetchAsync({url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function createGame(token: string): Promise<GameModel> {
    const url = `${PATH}/games?token=${token}`
    const data = {}
    const response = await postFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function getGame(token: string, gameId: number): Promise<GameModel> {
    const url = `${PATH}/games/${gameId}?token=${token}`
    const response = await getFetchAsync({url})
    if(!response.ok) {
        return
    }
    return await response.json()
}

export async function updateGame(token: string, game: GameModel) {
    const url = `${PATH}/games/${game.id}?token=${token}`
    const data = game
    const response = await patchFetchAsync({data, url})
    if(!response.ok) {
        return
    }
    return response
}