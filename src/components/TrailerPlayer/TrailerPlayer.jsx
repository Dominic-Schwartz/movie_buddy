import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchTrailerByMovieId } from "../../helpers/fetchTrailers";
import styles from "./TrailerPlayer.module.css";

const TrailerPlayer = ({ movieId, title }) => {
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const loadTrailer = async () => {
            const result = await fetchTrailerByMovieId(movieId);
            setTrailer(result);
        };

        if (movieId) {
            void loadTrailer();
        }
    }, [movieId]);

    return (
        <div className={styles.trailerWrapper}>
            {trailer ? (
                <iframe
                    key={trailer.key}
                    className={styles.trailerVideo}
                    src={`https://www.youtube.com/embed/${trailer.key}?controls=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <div className={styles.trailerFallback}>Geen trailer beschikbaar</div>
            )}
        </div>
    );
};

TrailerPlayer.propTypes = {
    movieId: PropTypes.number.isRequired,
    title: PropTypes.string,
};

export default TrailerPlayer;
