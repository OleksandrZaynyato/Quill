import mongoose from "mongoose";

const book = new mongoose.Schema({
    title: String,
    authors: [String],
    publisher: String,
    publishedDate: String,
    description: String,
    pageCount: Number,
    categories: [String],
    averageRating: Number,
    ratingsCount: Number,
    saleInfo: {
        country: String,
        saleability: String,
        isEbook: Boolean,
    },
    //links
    links: {
        previewLink: String,
        infoLink: String,
        canonicalVolumeLink: String,
        smallThumbnail: String,
        thumbnail: String,
    },
    embedding: [Number],
}, {
    collection: "books"
});

export default mongoose.model("Book", book);