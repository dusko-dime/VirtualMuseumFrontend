import breakpoints from "./breakpoints";

const bpsArray = Object.entries(breakpoints).reduce((arr, bp) => {
    arr.push(bp[1]);
    // eslint-disable-next-line no-param-reassign
    arr[bp[0]] = bp[1];
    return arr;
}, []);

const theme = {
    breakpoints: bpsArray,
    mediaQueries: {
        extraSmallScreen: `@media screen and (min-width: ${breakpoints.xs})`,
        smallScreen: `@media screen and (min-width: ${breakpoints.xs})`,
        mediumScreen: `@media screen and (min-width: ${breakpoints.md})`,
        largeScreen: `@media screen and (min-width: ${breakpoints.lg})`,
        extraLargeScreen: `@media screen and (min-width: ${breakpoints.xl})`,
    },
    colors: {
        primary: "#026aa7",
        primaryDark: "#005080",
        primaryLight: "#5bbcfc",
        primaryExtraLight: "#f0f8ff",
        secondary: "#ccc",
        secondaryDark: "#6b6b6b",
        secondaryLight: "e0e0e0",
        error: "#ff0015",
        warning: "#f2ef16",
        ok: "#30ff3e",
        fontDark: "#000",
        fontNormal: "#231c11",
        fontLight: "#f1f1f1",
        borderColor: "#A0A0A0",
        datatableBackgroundColor: "#FFF",
        datatableFontColor: "#2B2B2B",
    },
    space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 128, 256],
    sizes: [16, 32, 40, 48, 56, 64],
    fontSizes: [10, 12, 13, 16, 18, 21, 24, 32, 40, 44, 48],
    fontWeights: {
        light: 200,
        semiLight: 300,
        normal: 400,
        semiBold: 600,
        bold: 700,
    },
    borderRadiusDefault: 15,
};

export default theme;
