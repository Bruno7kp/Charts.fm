class Theme {
    public static light: string = '';
    public static dark: string = 'bg-dark text-light';

    public static getClasses(theme: string) {
        return theme === 'dark' ? Theme.dark : Theme.light;
    }
}

export default Theme;
