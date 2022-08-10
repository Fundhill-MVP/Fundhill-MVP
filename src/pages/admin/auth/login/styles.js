import { makeStyles } from "@material-ui/styles";
import { fundhill } from "../../../../images";
export default makeStyles(theme => ({
  container: {
    [theme.breakpoints.down("md")]: {
      height: '100vh'
    },
    height: "100%",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${fundhill})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "60%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      flex: 1,
      backgroundImage: `url(${fundhill})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
  },
  form: {
    width: 320,
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
    [theme.breakpoints.down("md")]: {
      color: 'white !important'
    }
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      color: 'white'
    }
  },
  googleButton: {
    marginTop: theme.spacing(6),
    boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
    [theme.breakpoints.down("md")]: {
      background: 'white'
    }
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    [theme.breakpoints.down("md")]: {
      color: 'white'
    },
    textTransform: "none",
    fontWeight: 600,
    border: 'none',
    background: 'none',
    color: 'blue',
    padding: 2,
    fontsize: '1rem',
    cursor: 'pointer'
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },

  containerr: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh'
  },

  confirmEmail: {
    color: '#ff5d48',
    fontWeight: 600,
    marginTop: 50,
    fontSize: '1.5rem'
  },
  para: {
    marginTop: 15
  },
  reSend: {
    textDecoration: 'none',
    color: 'blue',
    fontSize: '1.3rem',
    fontWeight: 500,
    marginTop: 10,
    marginBottom: 5,

  }
}));
