import styles from './UnauthorizedPage.module.css';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

function UnauthorizedPage() {
    return (
        <div className={styles.authContainer}>
            <div className={styles.authLeft}>
                <div className={styles.logoContainer}>
                    <p className={styles.logo}>
                        <Link to="/">MOVIE BUDDY</Link>
                    </p>
                </div>

                <div className={styles.messageContainer}>
                    <h2>401 - Geen toegang</h2>
                    <p className={styles.description}>
                        Je probeert een pagina te openen waarvoor je geen rechten hebt. Deze route is alleen toegankelijk voor bevoegde gebruikers.
                    </p>
                    <blockquote className={styles.quote}>
                        “Access denied by order of the Inquisition.”
                    </blockquote>


                    <div className={styles.buttonWrapper}>
                        <Button
                            text="Inloggen"
                            variant="landingLogin"
                            onClick={() => window.location.href = "/login"}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.authRight}></div>
        </div>
    );
}

export default UnauthorizedPage;
