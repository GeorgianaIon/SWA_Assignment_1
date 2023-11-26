import { reactive } from 'vue'
import { GameModel, UserModel } from './apiModels'
import * as BoardModel from './board'

class RandomGenerator implements BoardModel.Generator<string> {
    images: string[] = [
      "../images/cat1.png",
      "../images/cat2.png",
      "../images/cat3.png",
      "../images/cat4.png",
      "../images/cat5.jpg",
    ];
  
    next(): string {
        return this.images[Math.floor(Math.random() * this.images.length)];
    }
}

export const generator: RandomGenerator = new RandomGenerator();

const initGame = {
    id: parseInt(localStorage.getItem('gameId') ?? "-1"),
    user: -1,
    score: 0,
    completed: false,
    currentMoveNumber: 0,
    board: BoardModel.create(generator, 6, 6)
}

export type Model = {
    token: string,
    games: GameModel[],
    game: GameModel,
    user: Readonly<UserModel>,

    createGame(gameId: number): void,
    selectGame(game: GameModel): void,
    login(userid: number, token: string): void,
    logout(): void,
    updateBoard(board: BoardModel.Board<string>, score: number) : void
}

export const model: Model = reactive({
    token: localStorage.getItem('userToken') ?? '',
    games: [] as GameModel[],
    game: initGame,
    user: {
        username: '',
        password: '',
        id: parseInt(localStorage.getItem('userId') ?? "-1"),
        admin: false
    } as UserModel,
    
    createGame(gameId: number) {
        localStorage.setItem('gameId', gameId.toString())
        this.game = {...initGame, id: gameId, user: this.user.id, board: BoardModel.create(generator, 6, 6)}
    },
    selectGame(game: GameModel) {
        localStorage.setItem('gameId', game.id.toString())
        this.game = game
    },
    login(userid: number, token: string) {
        this.user.id = userid
        this.token = token
        localStorage.setItem('userToken', token) 
        localStorage.setItem('userId', userid.toString()) 
    },
    logout() {
        this.user = {
            username: '',
            password: '',
            id: 0,
            admin: false
        },
        this.token = ''
        localStorage.removeItem('userToken')
        localStorage.removeItem('userId')  
        localStorage.removeItem('gameId')  
    },
    updateBoard(board: BoardModel.Board<string>, score: number) {
        this.game.board = board,
        this.game.currentMoveNumber += 1,
        this.game.score += score
    }
})

