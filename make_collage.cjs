const Jimp = require('jimp');
const fs = require('fs');

async function createCollage() {
    console.log("Loading images...");
    const img1 = await Jimp.read('./ss/ss1.jpeg');
    const img2 = await Jimp.read('./ss/ss2.jpeg');
    const img3 = await Jimp.read('./ss/ss3.jpeg');
    const img4 = await Jimp.read('./ss/ss4.jpeg');

    // Assume all screenshots are roughly the same size, get width/height of first
    const w = img1.bitmap.width;
    const h = img1.bitmap.height;

    // Resize all to match the first one just in case
    img2.resize(w, h);
    img3.resize(w, h);
    img4.resize(w, h);

    // Create a new blank image (2x width, 2x height) with a dark background border
    const padding = 20;
    const collageW = (w * 2) + (padding * 3);
    const collageH = (h * 2) + (padding * 3);

    console.log("Creating collage canvas...");
    const collage = new Jimp(collageW, collageH, '#121218'); // TechNova dark background color

    // Paste images into the collage
    collage.composite(img1, padding, padding);
    collage.composite(img2, (w + padding * 2), padding);
    collage.composite(img3, padding, (h + padding * 2));
    collage.composite(img4, (w + padding * 2), (h + padding * 2));

    console.log("Saving collage...");
    await collage.writeAsync('./ss/LinkedIn_Collage.jpeg');
    console.log("Success! Collage saved to Day08/ss/LinkedIn_Collage.jpeg");
}

createCollage().catch(console.error);
