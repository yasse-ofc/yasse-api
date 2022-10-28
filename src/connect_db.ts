import * as dotenv from "dotenv";
import type { Db } from "mongodb";
import { MongoClient } from "mongodb";

export const db: { client?: MongoClient; db?: Db } = {};

export async function connectToDatabase() {
	dotenv.config();

	const url = process.env.MONGODB_LINK ?? "";
	const dbName = process.env.MONGODB_DB ?? "";

	const client: MongoClient = new MongoClient(url);

	await client.connect();

	const dbLocal: Db = client.db(dbName);

	db.db = dbLocal;
	db.client = client;
}
