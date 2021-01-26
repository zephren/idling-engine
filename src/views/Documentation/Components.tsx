import {
  Breadcrumbs,
  Container,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import index from "./index-md";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1em",
  },
}));

export function Documentation() {
  const classes = useStyles();

  console.log("Documentation render");

  return null;

  // return;
  // <Container>
  //   <Paper className={classes.paper}>
  //     <Breadcrumbs aria-label="breadcrumb">
  //       <Link color="inherit" href="/">
  //         Material-UI
  //       </Link>
  //       <Link color="inherit" href="/getting-started/installation/">
  //         Core
  //       </Link>
  //       <Typography color="textPrimary">Breadcrumb</Typography>
  //     </Breadcrumbs>
  //     <BrowserRouter basename="/idling-engine">
  //       <div>
  //         <Switch>
  //           <Route path="/control" render={() => <Edit />} />
  //           <Route path="/code" render={() => <Code />} />
  //           <Route path="/play" render={() => <Play />} />
  //           <Route path="/documentation" render={() => <Documentation />} />
  //           <Route path="/">
  //             <Redirect to="/edit" />
  //           </Route>
  //         </Switch>
  //       </div>
  //     </BrowserRouter>
  //     <ReactMarkdown plugins={[]} children={index()} />
  //   </Paper>
  // </Container>
}
