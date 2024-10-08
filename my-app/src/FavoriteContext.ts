// FavoriteContext.ts

import React from "react";

export const favThemes = {
    unfavorite: {
        background: '#eeeeee',
    },
    favorite: {
        background: '#FF0000',
    },
};

export const FavoriteContext = React.createContext(favThemes.unfavorite);