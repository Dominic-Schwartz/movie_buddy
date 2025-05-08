# 🎬 Movie Buddy

**Movie Buddy** is een interactieve React-applicatie voor filmliefhebbers. Gebruikers kunnen films zoeken, ontdekken, toevoegen aan hun watchlist en reviews schrijven. Admin gebruikers beschikken over extra rechten zoals toegang tot de admin pagina.

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

## 🖥️ Installatiehandleiding

Volg deze stappen om Movie Buddy lokaal te draaien:

1. **Clone de repository:**

```bash
git clone <repo-url>
```

2. **Navigeer naar de projectmap:**

```bash
cd movie-buddy
```

3. **Installeer dependencies:**

```bash
npm install
```

4. **Maak een `.env` bestand aan in de root:**

```env
VITE_API_KEY=YOUR_TMDB_API_KEY
VITE_NOVI_API_URL=https://frontend-educational-backend.herokuapp.com
```

5. **Start de app:**

```bash
npm run dev
```

De app is nu bereikbaar op [http://localhost:5173](http://localhost:5173)

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
- Extra toegang tot adminpagina

---

## 🖼️ Voorbeeldscherm

![Movie Detail Page](./assets/images/screenshot-detailpage.png)

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

## 📚 Verantwoordingsdocument & bronnen

- [Functioneel ontwerp PDF](./Functioneel%20Ontwerp%20Movie%20Buddy.pdf)
- [Figma-ontwerpen](https://www.figma.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)

---

🎓 *Deze app is ontwikkeld als onderdeel van de front-end opleiding aan NOVI Hogeschool.*