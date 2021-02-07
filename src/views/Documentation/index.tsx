import { Container, makeStyles, Paper } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { routes } from "./routes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const renderers = {
  link: (props: any) => {
    return <Link to={props.href}>{props.children}</Link>;
  },
  code: ({ language, value }: any) => {
    return (
      <SyntaxHighlighter
        style={materialDark}
        language={language}
        children={value}
      />
    );
  },
};

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1em",
  },
}));

export function Documentation() {
  const classes = useStyles();

  console.log("Documentation render");

  function renderRoutes() {
    return routes().map((route: any) => (
      <Route
        key={route.path}
        path={route.path}
        render={(history) => (
          <>
            <Breadcrumbs parts={route.breadcrumbs(history)} />
            <ReactMarkdown
              plugins={[]}
              children={route.children(history)}
              renderers={renderers}
            />
          </>
        )}
      />
    ));
  }

  return (
    <Container>
      <Paper className={classes.paper}>
        <BrowserRouter basename="/idling-engine/documentation">
          <div className="markdown-container">
            <Switch>{renderRoutes()}</Switch>
          </div>
        </BrowserRouter>
      </Paper>
    </Container>
  );
}
