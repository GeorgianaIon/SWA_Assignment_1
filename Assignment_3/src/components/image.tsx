import React from "react";
import { useSelector } from "react-redux";

interface ImageProps {
    src: string;
    alt: string;
}

const Image: React.FC<ImageProps> = ({src, alt}) => {
    //const imageSrc = useSelector((state: any) => state.imageSrc)
    return (
        <img src={src} alt= {alt}/>
    )
}
export default Image;