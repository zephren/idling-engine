import { Container, makeStyles, Paper } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { documentation } from "../../data/documentation";
import { Breadcrumbs } from "./Breadcrumbs";
import index from "./index-md";
import components from "./components-md";
import game from "./game-md";
import customComponents from "./customComponents-md";

const renderers = {
  link: (props: any) => {
    return <Link to={props.href}>{props.children}</Link>;
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

  return (
    <Container>
      <Paper className={classes.paper}>
        <BrowserRouter basename="/idling-engine/documentation">
          <div className="markdown-container">
            <Switch>
              {/*Components*/}
              <Route
                path="/components/:componentName"
                render={(history) => {
                  const { component } = documentation.components[
                    history.match.params.componentName
                  ];

                  return (
                    <>
                      <Breadcrumbs
                        parts={[
                          ["Documentation", ""],
                          ["Components", "components"],
                          [component.componentName, component.componentName],
                        ]}
                      />
                      <ReactMarkdown
                        plugins={[]}
                        children={component.documentation.md}
                        renderers={renderers}
                      />
                    </>
                  );
                }}
              />
              <Route
                path="/components"
                render={() => (
                  <>
                    <Breadcrumbs
                      parts={[
                        ["Documentation", ""],
                        ["Components", "components"],
                      ]}
                    />
                    <ReactMarkdown
                      plugins={[]}
                      children={components()}
                      renderers={renderers}
                    />
                  </>
                )}
              />
              {/* Game */}
              <Route
                path="/game"
                render={() => (
                  <>
                    <Breadcrumbs
                      parts={[
                        ["Documentation", ""],
                        ["Game", "game"],
                      ]}
                    />
                    <ReactMarkdown
                      plugins={[]}
                      children={game()}
                      renderers={renderers}
                    />
                  </>
                )}
              />
              {/* Custom Components */}
              <Route
                path="/customComponents"
                render={() => (
                  <>
                    <Breadcrumbs
                      parts={[
                        ["Documentation", ""],
                        ["Custom Components", "customComponents"],
                      ]}
                    />
                    <ReactMarkdown
                      plugins={[]}
                      children={customComponents()}
                      renderers={renderers}
                    />
                  </>
                )}
              />
              {/*Index*/}
              <Route
                path="/"
                render={() => (
                  <>
                    <Breadcrumbs parts={[["Documentation", ""]]} />
                    <ReactMarkdown
                      plugins={[]}
                      children={index()}
                      renderers={renderers}
                    />
                  </>
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Paper>
    </Container>
  );
}
