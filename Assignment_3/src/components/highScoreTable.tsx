import { GameModel } from "../reducers/game";

interface HighScoreTableProps {
    games: GameModel[]
  }

const HighScoreTable: React.FC<HighScoreTableProps> = ({games}) => {
    return (
    <table>
        <tbody>
            {games.map((game) => { return (
                <tr>
                    <td>
                        {game.user}
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
