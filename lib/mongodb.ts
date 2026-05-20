import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// mở rộng global type cho TypeScript
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // Dev mode: dùng global để tránh reconnect nhiều lần
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  // Production: tạo client mới
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;