import folderstructure from 'fs'

export const generateRandomCatImage = (imagesFolder: string) => {
    const randomCat = folderstructure.readdirSync(imagesFolder);
    const randomImage = Math.floor(Math.random() * randomCat.length)
    return `${imagesFolder}/${randomCat[randomImage]}`
}