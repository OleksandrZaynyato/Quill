import {ObjectId} from "mongodb";

// export interface book {
//     _id?: string | ObjectId;
//     title: string;
//     authors?: string[];
//     publisher?: string;
//     publishedDate?: string;
//     description?: string;
//     pageCount?: number;
//     categories?: string[];
//     averageRating?: number;
//     ratingsCount?: number;
//     saleInfo?: {
//         country?: string;
//         saleability?: string;
//         isEbook?: boolean;
//     }
//     links?: {
//         previewLink?: string;
//         infoLink?: string;
//         canonicalVolumeLink?: string;
//         smallThumbnail?: string;
//         thumbnail?: string;
//     }
//     embedding: number[];
// }

export interface BookType {
    _id: ObjectId;
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;

    saleInfo?: {
        country?: string;
        saleability?: string;
        isEbook?: boolean;
    };

    links?: {
        previewLink?: string;
        infoLink?: string;
        canonicalVolumeLink?: string;
        smallThumbnail?: string;
        thumbnail?: string;
    };

    embedding?: number[];
}
