export const getAllLikes = () => {
    const allReactionsPerMovie = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith("likes_")) {
            try {
                const userLikes = JSON.parse(localStorage.getItem(key));

                for (const [movieId, reaction] of Object.entries(userLikes)) {
                    if (!allReactionsPerMovie[movieId]) {
                        allReactionsPerMovie[movieId] = [];
                    }
                    allReactionsPerMovie[movieId].push(reaction);
                }

            } catch (e) {
                console.error(`❌ Fout bij verwerken van ${key}:`, e);
            }
        }
    }
    console.log("📦 Alle likes uit alle gebruikers:", allReactionsPerMovie);

    return allReactionsPerMovie;
};
