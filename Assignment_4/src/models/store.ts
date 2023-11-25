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

const generator: RandomGenerator = new RandomGenerator();
const initBoard = BoardModel.create(generator, 5, 5);

export type Model = {
    token: string,
    games: GameModel[],
    game: Readonly<GameModel>,
    user: Readonly<UserModel>,

    login(userid: number, token: string): void,
    logout(): void
}

export const model: Model = reactive({
    games: [] as GameModel[],
    token: localStorage.getItem('userToken') ?? '',
    game: {
        id: 0,
        user: 0,
        score: 0,
        completed: false,
        currentMoveNumber: 0,
        board: initBoard
    } as GameModel,
    user: {
        username: '',
        password: '',
        id: parseInt(localStorage.getItem('userId') ?? "-1"),
        admin: false
    } as UserModel,
    
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
    }
})

