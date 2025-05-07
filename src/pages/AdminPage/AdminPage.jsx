import styles from './AdminPage.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminLeft}>
                <div className={styles.header}>
                    <h2>Admin Dashboard</h2>
                </div>

                <div className={styles.messageContainer}>
                    <h2>Welkom op het Admin Dashboard</h2>
                    <p>
                        Deze pagina is gereserveerd voor beheerders. In een volledig ontwikkelde versie van Movie Buddy
                        zou dit dashboard beheerders toegang geven tot extra functionaliteiten zoals:
                    </p>
                    <ul>
                        <li>🎬 Uitlichten van geselecteerde films op de homepage</li>
                        <li>📝 Modereren van gebruikersreviews (goedkeuren of verwijderen)</li>
                        <li>🎭 Beheren van genres en categorieën</li>
                        <li>🔐 Wijzigen van gebruikersrollen</li>
                    </ul>
                    <p>
                        Vanwege beperkingen in de gebruikte <strong>NOVI-backend</strong> is het op dit moment niet mogelijk
                        om deze beheerfuncties technisch te implementeren. Alleen de rolherkenning (admin/user) en toegang tot
                        deze pagina zijn succesvol gerealiseerd.
                    </p>
                    <p>
                        Deze pagina dient daarom als visueel prototype en toont de intentie voor verdere doorontwikkeling.
                    </p>

                    <div className={styles.buttonWrapper}>
                        <Button
                            text="Homepage"
                            variant="menu"
                            onClick={() => navigate("/home")}
                        />
                        <Button
                            text="LandingPage"
                            variant="menu"
                            onClick={() => navigate("/")}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.adminRight}></div>
        </div>
    );
};

export default AdminPage;
