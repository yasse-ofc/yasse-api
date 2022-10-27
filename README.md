# Yasse API <!-- omit in toc -->

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
- [Want to contribute to Yasse?](#want-to-contribute-to-yasse)

---

## How to use the API

### API link

`https://yasse.live`

### Routes

|  Routes  | Output  |
| :------: | :-----: |
|  /anime  |  Anime  |
|  /manga  |  Manga  |
| /webtoon | Webtoon |
|  /novel  |  Novel  |

### Query Options

- `title <string>` : series title to search
- `OrderByLatestChapter <boolean>` : order by latest chapter
- `source <string>` : get series from an specific source
- [TODO] `random <true or false>` : get random chapter

### Example input

```ts
fetch('https://yasse.live/manga?title=chainsaw&orderByLatestChapter=true')
    .then(response => response.json())
```

### Example output

```ts
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

## Want to contribute to Yasse?

[Read this](https://github.com/yasse-ofc/.github/blob/main/CONTRIBUTING.md) and follow our [Code of Conduct](https://github.com/yasse-ofc/.github/blob/main/CODE_OF_CONDUCT.md).

---
