export const sort = (a: { latestChapter: number; }, b: { latestChapter: number; }): number => b.latestChapter - a.latestChapter;

module.exports = { sort };