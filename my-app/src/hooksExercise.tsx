import React, {useState, useEffect, useContext} from 'react';
import { ThemeContext, themes } from './ThemeContext';
import { FavoriteContext, favThemes } from './FavoriteContext';

export function ClickCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You Clicked ${count} times`;
    }, [count]);
    const theme = useContext(ThemeContext);
    return (
        <div
            style={{
                background: theme.background,
                color: theme.foreground,
                padding: "20px",
            }}
        >
            <p>You Clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}
            style={{background: theme.foreground, color: theme.background}}
            >
                Click me!
            </button>
        </div>
    );
}

export function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark :
        themes.light);
    };

    return (
        <ThemeContext.Provider value={currentTheme}>
            <button onClick={toggleTheme}> Toggle Theme</button>
            <ClickCounter />
        </ThemeContext.Provider>
    );
}


export function FavoriteButton() {
    const [favorite, setFavorite] = useState(favThemes.unfavorite);

    const favoriteButton = () => {
        setFavorite(favorite === favThemes.unfavorite ? favThemes.favorite :
        favThemes.unfavorite);
    };

    return (
        <FavoriteContext.Provider value={favorite}>
            <button onClick={favoriteButton} style={{background: favorite.background,}}>🤍</button>
        </FavoriteContext.Provider>
    );

}