import { getAllGames } from "../api/gameapi";
import { GameModel } from "../models/apiModels";
import HighScoreTable from "../components/highScoreTable";
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
    const user = useAppSelector((state) => state.userReducer)
    const [games, setGames] = useState<GameModel[]>([]);
    
    if (games.length === 0) {
        getAllGames(user.token).then(result => { 
            setGames(mapToModel(result))
        }).catch(_ => alert("Could not get the high scores"))
    }
              
    const top10Games = games.sort((a,b) => a.score - b.score).reverse().slice(0, 10)
    const top3OwnGames = games.filter(game => game.user == user.id).sort((a,b) => a.score - b.score).reverse().slice(0,3)

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