// import { MongoClient, ServerApiVersion } from "mongodb";
//
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
//
// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected ✅");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("MongoDB connection error ❌:", error.message);
        } else {
            console.error("MongoDB connection error ❌:", error);
        }
        process.exit(1);
    }
}