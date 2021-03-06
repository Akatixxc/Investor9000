# Soveltava projekti, Rasmus Haavisto, Andreas Säilä, Milla Sipilä

# Sovellus oli livenä osoitteessa https://investor9000.tech/

# Kuvia

Kirjautumissivu

<img src="https://i.imgur.com/CZVo2DU.jpg" alt="Login" width="800"/>

Päänäkymä

<img src="https://i.imgur.com/LM2oBAe.jpg" alt="Main" width="800"/>

<img src="https://i.imgur.com/Bgx449g.jpg" alt="Main2" width="800"/>


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

1. yarn install

Tee root kansioon .env tiedosto ja lisää sinne sisällöt .envBase tiedostosta ja lisää finnhubin api key paikalleen.

2. yarn dev

muut mahdolliset komennot löytyvät package.jsonista kohdasta "scripts"
mahdollista myös käyttää npm mutta selkeempää jos kaikki käyttää samaa

## Yleistä

Seurataan backin puolella seuraavaa ideologiaa ja struktuuria:
[Nodejs Project structure](https://softwareontheroad.com/ideal-nodejs-project-structure/)
Käyttäjän authentikaatioon käytetään JWT tokeneita.
[JWT.io](https://jwt.io/)

Todo+ plugarin avulla laitetaan kehitysideoita todo.todo tiedostoon

### Error käsittely ja status koodit:

Http status koodeista ja niiden merkityksestä voi lukea täältä:
https://www.restapitutorial.com/httpstatuscodes.html

Ei tarvita muita kun tähdellä merkittyjä, tuskin kaikkia niistäkään.

Jos tarvii "heittää" virhe, tee Error() objekti sen jälkeen error käsittely javasta tutulla try catchiä käyttäen.
kun clientille lähetetään error, aseta virheelle status (err.status = 40x) ja sen jälkeen next(errorObjekti), tällöin virhe menee viimeiseen "routeen":
app.use((err, req, res, \_next) => {
res.status(err.status || 500).json({ message: err.message });
});
ja client ymmärtää tämän message tyylin.

jos ei palauteta dataa, käytetään statuskoodia 204, muussa tapauksessa tulee lähettää clientille dataa eli res.json(dataa)
pelkkä status laitetaan kutsulla res.sendStatus(204)

clientin puolella kutsuja tehdessä:

```JavaScript
get('url', body ja muut headerit, tarviiko authentikaatiota?)
    .then(res => {
        onnistuneen kutsun käsittely, 200 sarjan http koodi, res on null jos status on 204
    })
    .catch(err => {
        epäonnistuneen kutsun käsittely, 400/500 sarjan http koodi
    })
```

Lisäksi on lisätty snackbar jonka kanssa saadaan näytettyä virheet käyttäjälle

käyttö react hookkien kanssa:

```JS
import { useSnackbar } from 'notistack';
const { enqueueSnackbar } = useSnackbar();
enqueueSnackbar('Täytä molemmat kentät!', { variant: 'warning' });
```

React class:

```JS
import { withSnackbar } from 'notistack';
class MyComponent extends Component {
    this.props.enqueueSnackbar('Täytä molemmat kentät!', { variant: 'warning' })
};
export default withSnackbar(MyComponent);
```

### Logger

Logitukseen käytetään log4js kirjastoa, sen saa käyttöön kirjoittamalla

```JS
const { logger } = require('./logger');
// Erilaiset logit - valitse tilanteeseen sopiva
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
```

### Express routet

Express routet alkavat index.js tiedostosta app.use('/api', routes);
routes.js tiedostoon määritellään ylätason routet esim. auth
ja vasta authRoutes sisältä löytyy kaikki authentikaatioon liittyvien reittien koodit

## Database

[MariaDB](https://mariadb.com/) lataa & asenna
[node library mariadb:lle](https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/)
[Hyödyllinen GUI databasen käyttöä auttamaan, HeidiSQL](https://www.heidisql.com/)

Kun olet asentanut kannan, tee sinne database, itse nimesin oman "investor"
Databasessa aja SQL query:

```SQL
CREATE TABLE `user` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`username` TEXT NOT NULL DEFAULT '',
`password` TEXT NOT NULL DEFAULT '',
PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=0
;
```

## ENV tiedosto

.env tiedostoon tulee määrittää seuraavat arvot:

FINNHUB_KEY= oma api-key finnhubiin, löytyy finnhubin sivulta
JWT_TOKEN_SECRET= string jonka perusteella generoidaan salasana hashit, aka hakkaa päätäsi näppäimistöön ja generoi näin random string
DB_HOST= localhost, ellei database ole jollain muulla koneella
DB_NAME= databasen nimi (itse nimesin investor)
DB_USER= käyttäjä, luultavasti root
DB_PASSWORD= käyttäjän salasana, kysyy asentaessa

## Mahdollisia kirjastoja, voidaan käyttää muitakin

[Material-ui](https://material-ui.com/) - [Lisäinfoa Material desingin periaattesta löytyy täältä](https://material.io/)

## Palaverit

9.3

-   Projektin ideointia valitsimme projektiksi investointi sovelluksen
-   Sovimme, että rasmus tekee pohjan ja jatketaan siitä.

10.3

-   Projektin pohja valmis - edetään seuraavasti:
-   Andreas suunnittelee apin käyttöä sekä kannan toteutusta
-   Rasmus koodaa käyttäjän authentikoinnin
-   Milla suunnittelee sovelluksen ulkonäköä sekä toimivuutta
-   Tarkastetaan tilanne uudelleen kun kaikki on päässyt vauhtiin

23.3

-   Rasmus on saanut authentikaation tehtyä
-   Milla on suunnitellut sivut ja sovellukselle perus ulkonäön
-   Andreas on tutkinut Finnhub apia ja pystyy aloittamaan backendin suunnittelun
-   Milla alkaa toteuttamaan suunnitelmaansa frontin puolella
-   Rasmus ja Anreas aloittavat backendin ja kannan toteutuksen

27.3

Ilta oli kuin morsian, kevät aurinko oli laskaeutumassa horisontin tuolle puolelle. Metsä havahtui lempeästä tuulahduksesta. Oli tulossa kesä...

-   Frontti on siirretty reactiin
-   Kanta päivittyy automaattisesti suomen pörssiyhtiöistä sekä osakkeiden hinnoista
-   Taulut tehdään automaattisesti jos niitä ei ole
-   Aloitetaan yhdistämään fronttia ja backkiä niiltä osin, mitä nyt fronttiin on tehty ja suunnitellaan lisää sen jälkeen.

30.3

-   Frontin ja backin yhdistys on raakaversiona ja rankkaa testausta vailla valmis
-   Mahdollinen ongelma ilmeni kannan kanssa, pool vuotaa connectioneja jostain
-   Andreas teki uuden logon sovellukselle
-   Tästä eteenpäin kehitetään fronttia näyttämään paremmalta sekä keksitään uutta ja parannettavaa sovellukseen

23.4
-   Pienen tauon jälkeen palattiin sorvin ääreen.
-   Hankimme sovellukselle domain namen investor9000.tech
-   Veimme sovelluksen Amazonin AWS pilveen
-   Sovelluksella on Let's encryptin SSL sertifikaatti
   
-   Lisäksi lisäsimme CI testit gitlabiin, ja muutaman esimerkkitestin.

-   Milla on saanut raportin valmiiksi ja viimeistelimme esityksen.

-   Viikonlopun aikana kaikki voivat vielä tehdä muutoksia ja viimeistelyjä sovellukseen.

