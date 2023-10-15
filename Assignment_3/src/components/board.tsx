import * as React from  'react';
import Image from './image';
import { useSelector } from 'react-redux';

const BoardGame: React.FC = () => {
    const srcImage = useSelector((state: any) => state.imageSrc);
    return (
        <div>
            <Image src= {srcImage} alt= "cat" />
        </div>
    );
}

export default BoardGame;