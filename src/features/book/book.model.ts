import mongoose from "mongoose";
import type {BookType} from "./book.types";

const book = new mongoose.Schema<BookType>({
    title: { type: String, required: true },
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

export default mongoose.model<BookType>("Book", book);