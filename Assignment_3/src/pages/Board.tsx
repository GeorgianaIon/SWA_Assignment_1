import Image  from '../components/image'
import useImage from "react-hook-image"


const BoardPage = ({}) => {
    let src =  require('../images/cat1.png').default
    return ( <Image src={src} alt= 'cat'/>)

}
export default BoardPage;