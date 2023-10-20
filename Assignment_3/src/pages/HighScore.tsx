import { getAllGames } from "../api/gameapi";
import { GameModel } from "../models/apiModels";
import { StateData } from "../reducers/game";
import HighScoreTable from "../components/HighScoreTable";
import { useAppSelector } from "../config/store";
import { useState } from "react";

const mapToModel = (result: any): GameModel[] => {
    return result.map((game: any) => { 
        return {
            id: game.id,
            user: game.user,
            score: game.score,
            completed: game.completed
        }
    })
}

const HighScorePage = () => {
    const token = useAppSelector((state : StateData) => state.token)
    const userId = useAppSelector((state : StateData) => state.userId)
    const [games, setGames] = useState<GameModel[]>([]);
    
    if (games.length === 0) {
        getAllGames(token).then(result => { 
            setGames(mapToModel(result))
        })
    }
              
    const top10Games = games.sort((a,b) => a.score - b.score).reverse().slice(0, 10)
    const top3OwnGames = games.filter(game => game.user == userId).sort((a,b) => a.score - b.score).reverse().slice(0,3)

    return ( 
        <div className ="highscores">
            <h2>High score</h2>
            <HighScoreTable games={top10Games}/>
            <br/>
            <h2>Own high score</h2>
            <HighScoreTable games={top3OwnGames}/>
        </div>
    )
}
export default HighScorePage;