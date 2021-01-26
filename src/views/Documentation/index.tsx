import { Container, makeStyles, Paper, Typography } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { documentation } from "../../data/documentation";
import { Breadcrumbs } from "./Breadcrumbs";
import index from "./index-md";

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
          <div>
            {/*Components*/}
            <Switch>
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
                          [component.name, component.name],
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
