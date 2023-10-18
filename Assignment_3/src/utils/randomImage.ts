import folderstructure from 'fs'

export const generateRandomCatImage = (imagesFolder: string) => {
    const cats = folderstructure.readdirSync(imagesFolder);
    const randomImage = Math.floor(Math.random() * cats.length)
    return `${imagesFolder}/${cats[randomImage]}`
}