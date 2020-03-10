# Soveltava projekti, Rasmus Haavisto, Andreas Säilä, Milla Sipilä

## Vaaditut VSCode plugarit

-   ESlint
-   Prettier
-   DotENV
-   Todo+ -> lisäinfoa Rasmukselta

-   Ctrl + shift + P -> Preferences: Open Settings (JSON) -> lisää seuraavat

```JSON
"prettier.tabWidth": 4,
"prettier.printWidth": 160,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"files.autoSave": "onFocusChange",
"editor.formatOnSave": true,
"editor.formatOnType": true,
"eslint.enable": true,
"eslint.alwaysShowStatus": true,
"prettier.singleQuote": true,
```

### vapaaehtoisia/hyviä plugareja vscodeen

-   Gitlens
-   Import Cost

Tyylittelyyn:

-   Dracula Offical
-   Material Theme
-   Material Theme icons

## Aloitus

[Asenna yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)

yarn install
yarn dev

muut mahdolliset komennot löytyvät package.jsonista kohdasta "scripts"
mahdollista myös käyttää npm mutta selkeempää jos kaikki käyttää samaa

Tee root kansioon .env tiedosto ja lisää sinne sisällöt .envBase tiedostosta ja lisää finnhubin api key paikalleen.

## Yleistä

Seurataan backin puolella seuraavaa ideologiaa ja struktuuria:
[Nodejs Project structure](https://softwareontheroad.com/ideal-nodejs-project-structure/)

Todo+ plugarin avulla laitetaan kehitysideoita todo.todo tiedostoon

## Mahdollisia kirjastoja, voidaan käyttää muitakin

[Material-ui](https://material-ui.com/) - [Lisäinfoa Material desingin periaattesta löytyy täältä](https://material.io/)
