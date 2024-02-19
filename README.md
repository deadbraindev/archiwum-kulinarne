[![Logo](https://archiwumkulinarne.deadbrain.dev/images/opengraph-img-1200-630.jpg)](https://archiwumkulinarne.deadbrain.dev/)

# [archiwum kulinarne](https://archiwumkulinarne.deadbrain.dev/)

- [x] CRUD (backend i frontend)
- [x] restAPI
- [x] RWD, ui/ux, web accessibility, PWA, skeleton ui
- [x] query params w linku, filtrowanie danych (backend i frontend)
- [x] deploy działającej aplikacji i optymalizaja
- [x] analityka, SEO, meta-tagi
- [x] 'ulubione' zapisywane w localstorage

## Frontend
- [x] list recipes [`/przepisy`](https://archiwumkulinarne.deadbrain.dev/przepisy)
- [x] query params [`/przepisy?kategoria=ciasta&strona=2&sortowanie=no&szukaj=a`](https://archiwumkulinarne.deadbrain.dev/przepisy?szukaj=a&sortowanie=no&kategoria=ciasta&strona=2)
- [x] custom 404 page [`/nieznaleziono`](https://archiwumkulinarne.deadbrain.dev/nieznaleziono)
- [ ] make contact form [`/kontakt`](https://archiwumkulinarne.deadbrain.dev/kontakt)

## API
- [x] list recipes [`/api/recipes`](https://archiwumkulinarne.deadbrain.dev/api/recipes)
- [x] get recipe `/api/recipes/:slug`
- [x] get random recipe [`/api/recipes/random`](https://archiwumkulinarne.deadbrain.dev/api/recipes/random)
- [x] get daily recipe [`/api/recipes/daily`](https://archiwumkulinarne.deadbrain.dev/api/recipes/daily)
- [ ] list categories [`/api/categories`]
- [ ] list all api info [`/api`](https://archiwumkulinarne.deadbrain.dev/api)

## Query params
- **page** - number
  - e.g. [`/api/recipes?page=2`](https://archiwumkulinarne.deadbrain.dev/api/recipes?page=2)
- **category** - enum ('ciasta', 'drinki', 'fastdood', 'lody', 'obiadowe', 'przetwory', 'ryby', 'salatki', 'slodkie', 'soki' )
  - e.g. [`/api/recipes?category=ciasta`](https://archiwumkulinarne.deadbrain.dev/api/recipes?category=ciasta)
- **search** - string
  - e.g. [`/api/recipes?search=gofry`](https://archiwumkulinarne.deadbrain.dev/api/recipes?search=gofry)
- **size** - number (1-100, default 24)
  - e.g. [`/api/recipes?size=10`](https://archiwumkulinarne.deadbrain.dev/api/recipes?size=10)
- **sort** - enum
  - _null_: A → Z (default)
  - 'za': Z → A
  - 'no': NEW → OLD
  - 'on': OLD → NEW
  - e.g. [`/api/recipes?sort=za`](https://archiwumkulinarne.deadbrain.dev/api/recipes?sort=za)


## API example response:

<details>
    <summary>`/api/recipes/gofry-1`</summary>

```json
{
"success": true,
"id": "653ac89ae994f2418da743d5",
"name": "Gofry",
"slug": {
  "slugCurrent": "gofry-1",
  "slugHistory": [ "gofry-1" ]
},
"path": "/api/recipes/gofry-1",
"origin": "/api/recipes",
"category": "slodkie",
"stages": {
  "size": 1,
  "items": [{
    "index": 0,
    "title": null,
    "ingredients": [ "25dag mąki pszennej", "25dag mąki ziemniaczanej", "1 kostka margaryny", "30dag cukru", "5 jajek", "1 cukier wanilinowy", "1 łyżka proszku do pieczenia", "mleko" ],
    "preparing": "brak oryginalnego opisu przygotowania",
    "GPTpreparing": "W misce wymieszaj obie mąki, dodaj roztopioną margarynę, cukier, jajka, cukier wanilinowy i proszek do pieczenia. Stopniowo dodawaj mleko, mieszając, aż uzyskasz gładkie ciasto.\nRozgrzej gofrownicę, nalej ciasto i piecz, aż gofry staną się złociste.\nPodawaj z ulubionymi dodatkami!"
  }]
},
"images": {
  "size": 1,
  "items": [{
    "index": 0,
    "thumbnail": "https://iili.io/JKZiUUG.md.jpg",
    "src": "https://iili.io/JKZiUUG.jpg",
    "alt": "handwritten recipe, scan"
  }]
},
"tags": [ "gofry", "chrupiące", "złociste", "przepyszne", "deser", "śniadanie", "jajka", "mąka", "cukier", "proszek do pieczenia", "mleko", "pyszne", "łatwe", "przekąska", "cukier wanilinowy" ],
"description": "Przygotuj pyszne gofry o chrupiącej skorupce i delikatnym wnętrzu. Zaskocz swoje podniebienie smakiem doskonałym na każdą okazję!",
"timestamps": {
  "createdAt": "2023-10-26T20:14:18.332Z",
  "updatedAt": "2024-01-20T16:05:16.871Z"
}
}
```

</details>




## Demo

latest (nextJS): https://archiwumkulinarne.deadbrain.dev/

old version (react): https://archiwumkulinarne.netlify.app/



