[![Logo](https://archiwumkulinarne.deadbrain.dev/images/opengraph-img-1200-630.jpg)](https://archiwumkulinarne.deadbrain.dev/)

# [archiwum kulinarne](https://archiwumkulinarne.deadbrain.dev/)

- [x] CRUD (backend i frontend)
- [x] restAPI
- [x] RWD, ui/ux, web accessibility, PWA, skeleton ui
- [x] query params w linku, filtrowanie danych (backend i frontend)
- [x] deploy działającej aplikacji i optymalizaja
- [x] analityka, SEO, meta-tagi
- [x] 'ulubione' zapisywane w localstorage

## API examples
- https://archiwumkulinarne.deadbrain.dev/api/recipes
- https://archiwumkulinarne.deadbrain.dev/api/recipes?page=2
- https://archiwumkulinarne.deadbrain.dev/api/recipes/random
- https://archiwumkulinarne.deadbrain.dev/api/recipes/daily
- https://archiwumkulinarne.deadbrain.dev/api/recipes/gofry-1

> [!TIP]
> available query:
> - **page** - number
> - **category** - enum ('ciasta', 'drinki', 'fastdood', 'lody', 'obiadowe', 'przetwory', 'ryby', 'salatki', 'slodkie', 'soki' )
> - **search** - string
> - **size** - number (1-100, default 24)
> - **sort** - enum
>   - _null_: A → Z (default)
>   - 'za': Z → A
>   - 'no': NEW → OLD
>   - 'on': OLD → NEW

### API response:
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


## Demo

latest (nextJS): https://archiwumkulinarne.deadbrain.dev/

old version (react): https://archiwumkulinarne.netlify.app/
