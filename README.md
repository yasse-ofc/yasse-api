# YASSE API <!-- omit in toc -->

---

A free RESTful API to search series (manga, anime, webtoons and novels) from a lot of websites at once.

---

## Table of Contents <!-- omit in toc -->

- [How to use the API](#how-to-use-the-api)
  - [API link](#api-link)
  - [Routes](#routes)
  - [Query Options](#query-options)
  - [Example input](#example-input)
  - [Example output](#example-output)
- [Demo](#demo)
- [Want to contribute with YASSE?](#want-to-contribute-with-yasse)

---

## How to use the API

### API link

`https://yasse-api.fly.dev`

### Routes

|  Routes  | Output  |
| :------: | :-----: |
|  /anime  |  Anime  |
|  /manga  |  Manga  |
| /webtoon | Webtoon |
|  /novel  |  Novel  |

### Query Options

- `title <string>` : series title to search
- `OrderByLatestChapter <true or false>` : order by latest chapter
- [TODO] `random <true or false>` : get random chapter
- [TODO] `source <string>` : get series from an specific source

### Example input

`https://yasse-api.fly.dev/manga?title=chainsaw&orderByLatestChapter=true`

### Example output

```js
[
    ...,
    {
        title: ".hack//intermezzo"
        href:"https://9anime.vc/watch/hackintermezzo-5449"
        img: "https://img.bunnycdnn.ru/_r/300x400/100/20/06/20068dbb6c6a731c9fb34185…"
        latestChapter: "1"
        source: "9animes"
    },
    ...
]
```

---

## Demo

WIP

---

## Want to contribute with YASSE?

[Read this](./CONTRIBUTING.md) and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

---
