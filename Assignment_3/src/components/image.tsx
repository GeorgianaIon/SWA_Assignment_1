import React from "react";

interface ImageProps {
    src: string;
}

const Image: React.FC<ImageProps> = ({src}) => {
    const imageMapping: Record<string, string> = {
        "../images/cat1.png": require("../images/cat1.png").default,
        "../images/cat2.png": require("../images/cat2.png").default,
        "../images/cat3.png": require("../images/cat3.png").default,
        "../images/cat4.png": require("../images/cat4.png").default,
        "../images/cat5.jpg": require("../images/cat5.jpg").default,
    };
    const imagePath = imageMapping[src] || "";
    return (
        <img src={imagePath} alt="Image" />
    );
}

export default Image;