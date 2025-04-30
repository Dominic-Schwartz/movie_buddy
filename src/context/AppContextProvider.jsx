import PropTypes from "prop-types";
import { AuthProvider } from "./AuthProvider";
import { AvatarProvider } from "./AvatarProvider";
import { WatchlistProvider } from "./WatchlistProvider";
import { LikesProvider } from "./LikesProvider";

export const AppContextProvider = ({ children }) => {
    return (
        <AuthProvider>
            <AvatarProvider>
                <WatchlistProvider>
                    <LikesProvider>
                        {children}
                    </LikesProvider>
                </WatchlistProvider>
            </AvatarProvider>
        </AuthProvider>
    );
};

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
