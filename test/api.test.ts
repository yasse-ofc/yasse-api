import router from "../src/routes";
import request from "supertest";
import { db, connectToDatabase } from "../src/connect_db";

jest.setTimeout(10000);

beforeAll(async () => {
	await connectToDatabase();
});

afterAll(async () => {
	await db.client.close();
});

describe("routes", () => {
	describe("get anime route", () => {
		it("should return an empty list", async () => {
			const animeName = "no way an anime has this name";

			await request(router).get(`/anime?title=${animeName}`).expect([]);
		});

		it("should return some anime", async () => {
			const animeName = "one";

			const response = (await request(router).get(`/anime?title=${animeName}`))
				.body;

			expect(!Object.keys(response).length).toBe(false);
		});

		it("should return a anime list sorted by latest chapter", async () => {
			const animeName = "one";

			const response = (
				await request(router).get(
					`/anime?title=${animeName}&orderByLatestChapter=true`,
				)
			).body;

			let check = false;

			for (let i = 1; i < response.length; i++) {
				if (response[i].latestChapter > response[i - 1].latestChapter) {
					check = true;
					break;
				}
			}

			expect(check).toBe(false);
		});
	});

	describe("get manga route", () => {
		it("should return an empty list", async () => {
			const mangaName = "no way an manga has this name";

			await request(router).get(`/manga?title=${mangaName}`).expect([]);
		});

		it("should return some manga", async () => {
			const mangaName = "one";

			const response = (await request(router).get(`/manga?title=${mangaName}`))
				.body;
			expect(!Object.keys(response).length).toBe(false);
		});

		it("should return a manga list sorted by latest chapter", async () => {
			const mangaName = "one";

			const response = (
				await request(router).get(
					`/manga?title=${mangaName}&orderByLatestChapter=true`,
				)
			).body;

			let check = false;

			for (let i = 1; i < response.length; i++) {
				if (response[i].latestChapter > response[i - 1].latestChapter) {
					check = true;
					break;
				}
			}

			expect(check).toBe(false);
		});
	});

	describe("get webtoon route", () => {
		it("should return an empty list", async () => {
			const webtoonName = "no way an webtoon has this name";

			await request(router).get(`/webtoon?title=${webtoonName}`).expect([]);
		});

		it("should return some webtoon", async () => {
			const webtoonName = "one";

			const response = (
				await request(router).get(`/webtoon?title=${webtoonName}`)
			).body;

			expect(!Object.keys(response).length).toBe(false);
		});

		it("should return a webtoon list sorted by latest chapter", async () => {
			const webtoonName = "one";

			const response = (
				await request(router).get(
					`/webtoon?title=${webtoonName}&orderByLatestChapter=true`,
				)
			).body;

			let check = false;

			for (let i = 1; i < response.length; i++) {
				if (response[i].latestChapter > response[i - 1].latestChapter) {
					check = true;
					break;
				}
			}

			expect(check).toBe(false);
		});
	});

	describe("get novel route", () => {
		it("should return an empty list", async () => {
			const novelName = "no way an novel has this name";

			await request(router).get(`/novel?title=${novelName}`).expect([]);
		});

		it("should return some novel", async () => {
			const novelName = "one";

			const response = (await request(router).get(`/novel?title=${novelName}`))
				.body;

			expect(!Object.keys(response).length).toBe(false);
		});

		it("should return a novel list sorted by latest chapter", async () => {
			const novelName = "one";

			const response = (
				await request(router).get(
					`/novel?title=${novelName}&orderByLatestChapter=true`,
				)
			).body;

			let check = false;

			for (let i = 1; i < response.length; i++) {
				if (response[i].latestChapter > response[i - 1].latestChapter) {
					check = true;
					break;
				}
			}

			expect(check).toBe(false);
		});
	});
});
