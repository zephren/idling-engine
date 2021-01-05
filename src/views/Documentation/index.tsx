import {
  Breadcrumbs,
  Container,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import index from "./index-md";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1em",
  },
}));

export function Documentation() {
  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.paper}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Material-UI
          </Link>
          <Link color="inherit" href="/getting-started/installation/">
            Core
          </Link>
          <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
        <ReactMarkdown plugins={[]} children={index} />
      </Paper>
    </Container>
  );
}
