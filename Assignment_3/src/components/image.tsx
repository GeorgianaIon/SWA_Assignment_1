import React from "react";

interface ImageProps {
    src: string;
}

const Image: React.FC<ImageProps> = ({src}) => {
    return (
        <img src={require(src).default}></img>
    )
}
export default Image;