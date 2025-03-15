import PropTypes from "prop-types";
import Modal from "../../components/Modal/Modal";
import "./TermsPrivacyPopup.css";

const TermsPrivacyPopup = ({ isOpen, onClose, contentType }) => {
    const termsText = `
        **Gebruikersvoorwaarden**
        
        Welkom bij Movie Buddy! Door gebruik te maken van onze diensten, ga je akkoord met de volgende voorwaarden:
        
        1. **Gebruik van de Dienst**: Je mag Movie Buddy uitsluitend gebruiken voor persoonlijk, niet-commercieel gebruik.
        2. **Account en Beveiliging**: Je bent verantwoordelijk voor de veiligheid van je account.
        3. **Inhoud en Aansprakelijkheid**: Movie Buddy biedt informatie over films, maar is niet verantwoordelijk voor de juistheid van gegevens.
        4. **Wijzigingen**: We behouden het recht om deze voorwaarden te wijzigen. De meest recente versie zal altijd beschikbaar zijn in de app.
        
        Door verder te gaan, ga je akkoord met deze voorwaarden.`;

    const privacyText = `
        **Privacyverklaring**
        
        Movie Buddy respecteert je privacy. In deze verklaring leggen we uit hoe we met jouw gegevens omgaan:
        
        1. **Verzamelde Gegevens**: We verzamelen je e-mailadres en voorkeuren voor het verbeteren van de dienst.
        2. **Gebruik van Gegevens**: Jouw gegevens worden gebruikt om je een gepersonaliseerde ervaring te bieden.
        3. **Beveiliging**: We nemen maatregelen om je gegevens veilig te houden, maar kunnen geen absolute bescherming garanderen.
        4. **Derden**: We delen jouw gegevens niet met derden zonder jouw toestemming.
        
        Voor vragen over je privacy kun je contact met ons opnemen.`;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="terms-privacy-content">
                <h2>{contentType === "terms" ? "Gebruikersvoorwaarden" : "Privacyverklaring"}</h2>
                <div className="scrollable-content">
                    {contentType === "terms"
                        ? termsText.split("\n").map((line, index) => <p key={index}>{line}</p>)
                        : privacyText.split("\n").map((line, index) => <p key={index}>{line}</p>)}
                </div>
                <button onClick={onClose} className="close-button">Sluiten</button>
            </div>
        </Modal>
    );
};

TermsPrivacyPopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    contentType: PropTypes.string.isRequired,
};

export default TermsPrivacyPopup;