import mongoose from "mongoose";

let cachedConnection: mongoose.Connection | null = null;

async function connectDB() {
    try {
        if (cachedConnection) {
            return cachedConnection;
        }
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MongoDB connection URL is undefined.");
        }
        await mongoose.connect(mongoUrl, {
            dbName: "Hire-Hub",
        });
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB Connected Successfully");
        });
        connection.on("error", (err) => {
            console.error("Error Occurred while connecting to MongoDB:", err);
        });
        cachedConnection = connection;
        return connection;
    } catch (err) {
        console.error("Error Connecting to MongoDB:", err);
        process.exit(1);
    }
}

export default connectDB;