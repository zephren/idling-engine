import { Breadcrumbs as MUIBreadcrumbs } from "@material-ui/core";
import { Link } from "react-router-dom";

export function Breadcrumbs({ parts }: any) {
  let cumulativePath: any[] = [];

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {parts.map((part: any, index: number) => {
        const [name, pathPart] = part;

        if (pathPart) {
          cumulativePath.push(pathPart);
        }

        // if (index < parts.length) {
        return (
          <Link
            key={cumulativePath.join("")}
            to={`/${cumulativePath.join("/")}`}
          >
            {name}
          </Link>
        );
        // }

        // return <Typography color="textPrimary">{name}</Typography>;
      })}
    </MUIBreadcrumbs>
  );
}
