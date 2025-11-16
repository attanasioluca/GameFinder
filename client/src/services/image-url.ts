import noImage from "../assets/placeholder.webp"

const getCroppedImageUrl = (url: string) => {
    if(!url || url == "null") return noImage;
    const target = "media/"
    const i = url.indexOf(target) + target.length;
    return url.slice(0, i) + "crop/600/400/" + url.slice(i);
}

export default getCroppedImageUrl;