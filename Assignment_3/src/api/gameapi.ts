const PATH = `http://localhost:9090/`
// must be handled with tokens

interface FetchAsyncOptions {
    headers?: Record<string, string>
    url: string
}

interface PostFetchAsyncOptions extends FetchAsyncOptions {
    data: any
}


async function getFetchAsync({url}: FetchAsyncOptions) {
    const response = await fetch(url, { method: 'GET' })

    if (!response.ok) {
        console.log(response.statusText)
    }

    return response.json()
}
	
async function postFetchAsync({ headers, data, url }: PostFetchAsyncOptions): Promise<any> {
    headers ??= { "Content-Type": "application/json", Accept: "application/json" }
    const json = JSON.stringify(data)
    const response = await fetch(url, { headers, method: "POST", body: json })
  
    if (!response.ok) {
        console.log(response.statusText)
    }
  
    return response.json()
  }

export async function getAllUserGames(token: string) {
    const url = `${PATH}/${`games?token=`}` + token
    const data = await getFetchAsync({url})
}