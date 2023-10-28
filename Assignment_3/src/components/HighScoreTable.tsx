import { GameModel } from "../models/apiModels";

interface HighScoreTableProps {
    games: GameModel[]
  }

const HighScoreTable: React.FC<HighScoreTableProps> = ({games}) => {
    return (
    <table>
        <tbody>
            {games.map((game, index) => { return (
                <tr key={index}>
                    <td>
                        {index + 1}.
                    </td>
                    <td>
                        {game.score}
                    </td>
                </tr>)
            })}
        </tbody>
    </table>
    )
}

export default HighScoreTable;
