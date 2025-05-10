# 🎬 Movie Buddy - Installatiehandleiding

---

## 📖 Inhoudsopgave

1. [Inleiding](#-inleiding)
2. [Voorbeeldscherm](#-film-detail-pagina-uit-movie-buddy)
3. [Projectoverzicht](#-projectoverzicht)
4. [Gebruikte technieken](#-gebruikte-technieken)
5. [Installatie-instructies](#-installatie-instructies)
6. [NPM-commando's](#-beschikbare-npm-commando's)
7. [Inloggen als Admin](#-inloggen-als-admin)
8. [Gebruikersrollen](#-gebruikersrollen--functionaliteiten)
9. [NOVI-eindopdracht checklist](#-novi-eindopdracht-vereisten)

---

## 📌 Inleiding
Welkom bij **Movie Buddy**, de ultieme webapplicatie voor filmliefhebbers! 🎬
Met Movie Buddy kun je:
- Films zoeken en ontdekken via **The Movie Database (TMDb)** API.
- Een **persoonlijke watchlist** bijhouden.
- Beoordelingen geven aan films met een **like/dislike-systeem**.
- Een **review schrijven** voor elke film in de database.
- Inloggen en registreren via de **NOVI-backend**.

---

## 🖼️ Film Detail Pagina uit Movie Buddy
![screenshot-detailpage.png](src/assets/images/screenshot-detailpage.png)

---

## 🚀 Projectoverzicht

Deze applicatie is ontwikkeld als eindopdracht voor de front-end opleiding van NOVI Hogeschool. De focus ligt op:
- een schaalbare React-applicatie
- gebruik van context, routing en component hergebruik
- gebruikersinteractie via likes, reviews en een watchlist
- realistische en testbare use cases

---

## 🧰 Gebruikte technieken

- ⚛️ **React**
- 📦 **Axios** voor API-requests (TMDB)
- 🧭 **React Router**
- 🧠 **Context API** voor auth, watchlist, likes & reviews
- 🗂 **CSS Modules** voor styling
- 🔐 **LocalStorage** voor gebruikersdata en sessie behoud
- 📐 **Figma** voor UI/UX-ontwerp
- 🖼️ **TMDB API** voor filminformatie

---

## 🔧 Installatie-instructies

1. **Download en installeer eerst deze programma’s:**
    - [Node.js](https://nodejs.org/) (versie 16 of hoger)
    - [Git](https://git-scm.com/)
    - Een ontwikkelprogramma (IDE), bijvoorbeeld:  
      [WebStorm](https://www.jetbrains.com/webstorm/) of [Visual Studio Code](https://code.visualstudio.com/)

2. **Download het project:**
    - Ga naar [https://github.com/Dominic-Schwartz/movie_buddy](https://github.com/Dominic-Schwartz/movie_buddy)
    - Klik op de groene knop **‘Code’** en kies **‘Download ZIP’**
    - Pak het ZIP-bestand uit op een plek naar keuze

3. **Open het project in je IDE**

4. **Open de terminal:**
    - In WebStorm: klik onderin op `Terminal`
    - In VS Code: klik op `View > Terminal`

5. **Installeer de benodigde onderdelen:**

```bash
npm install
```

6. **Maak een `.env` bestand aan in de hoofdmap van het project (dus naast `package.json`)**

Plak de volgende regels in dat bestand:

```env
VITE_API_KEY=YOUR_TMDB_API_KEY
VITE_NOVI_API_URL=https://frontend-educational-backend.herokuapp.com
```

> 🔑 **LET OP:**  
> Vervang `YOUR_TMDB_API_KEY` door een echte API Key van [TMDb](https://www.themoviedb.org/).  
> Je kunt gratis een eigen API Key aanvragen via hun website.

> 🧪 **Voor examinatoren van NOVI Hogeschool:**  
> Een werkende API Key is bijgevoegd in een apart document genaamd `API_KEY_README.txt`.

7. **Start de applicatie:**

```bash
npm run dev
```

De app wordt nu automatisch geopend in je browser op [http://localhost:5173](http://localhost:5173)
## 🎯 Conclusie
Gefeliciteerd! 🎉 Je hebt **Movie Buddy** succesvol geïnstalleerd en draaiende.

---

## 📜 Beschikbare npm-commando's

| Commando       | Beschrijving |
|---------------|-------------|
| `npm run dev` | Start de ontwikkelserver op `http://localhost:5173/` |
| `npm run build` | Maakt een productie-build van de applicatie |
| `npm run preview` | Bekijkt de productie-build lokaal |
| `npm install` | Installeert alle benodigde dependencies |

---

## 🔐 Admin inloggegevens

Aangezien de beperkte back-end capaciteit, zijn de adminrechten gekoppeld aan een specifiek e-mailadres:

**Admin gebruiker:**
- **E-mailadres:** `adminbuddy@moviebuddy.nl`
- **Wachtwoord:** `AdminTest@1234`

Gebruik dit account om toegang te krijgen tot de admin functionaliteiten.

---

## 👥 Gebruikersrollen & Functionaliteiten

### 🔹 Gebruiker
- Registreren / Inloggen
- Films zoeken & filteren
- Films liken/disliken
- Watchlist beheren
- Reviews plaatsen
- Avatar kiezen

### 🔸 Admin
- Alle gebruikersfunctionaliteiten
- Extra toegang tot admin-pagina

---

## ✅ NOVI-eindopdracht vereisten

| Onderdeel                         | Status |
|----------------------------------|--------|
| 4 use cases geïmplementeerd     | ✅     |
| Minimaal 50 eisen beschreven    | ✅     |
| Gebruik externe API             | ✅     |
| CRUD-acties aanwezig            | ✅     |
| Wireframes + schermontwerpen    | ✅     |
| Documentatie en testen          | ✅     |
| Sessiebeheer + gebruikerscontext | ✅     |

---

🎓 *Deze app is ontwikkeld als onderdeel van de front-end opleiding aan NOVI Hogeschool.*