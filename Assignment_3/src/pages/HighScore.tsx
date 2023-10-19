import { useSelector } from "react-redux";
import { getAllGames } from "../api/gameapi";
import { GameModel } from "../reducers/game";
import HighScoreTable from "../components/highScoreTable";

const HighScorePage: React.FC = () => {
    const userId : number = useSelector((state : any) => state).games.id
    console.log(userId)

    let  gameModels: GameModel[] = []
    try 
    {
        // TODO get token
        //getAllGames(token).then(result => gameModels = result)
    } 
    catch (error) 
    {
        alert("Could not get the high scores");
    }
    const top10Games = gameModels.sort(game => game.score).reverse().splice(0, 10)
    const top3OwnGames = gameModels.filter(game => game.id == userId).sort(game => game.score).reverse().splice(0, 3)

    return ( 
        <div>
            <HighScoreTable games={top10Games}/>
            <br/>
            <HighScoreTable games={top3OwnGames}/>
        </div>
    )
}
export default HighScorePage;