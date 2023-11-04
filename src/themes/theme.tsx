import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
    typography: {
        fontSize: 14,
      },
});

theme.typography.h1 = {
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

export default theme;

