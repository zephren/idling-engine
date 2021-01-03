import { useNode } from "@craftjs/core";
import { Tab as MUITab, Tabs } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface Tab {
  name: string;
  default?: boolean;
  path: RegExp;
  to: string;
}

interface Props {
  path: string;
  tabs: Tab[];
  className?: string;
}

function getCurrentTab(path: string, tabs: Tab[]): [number, Tab | null] {
  let defaultTab = null;

  for (const index in tabs) {
    const tab = tabs[index];

    if (tab.default) {
      defaultTab = tab;
    }

    if (path.match(tab.path)) {
      return [parseInt(index), tab];
    }
  }

  // Redirect at this point;
  if (defaultTab) {
    return [-1, defaultTab];
  }

  return [-1, null];
}

export function ToolBarTabs({ path, tabs, className }: Props) {
  const {
    connectors: { connect },
  } = useNode();
  const history = useHistory();

  const [currentTabIndex, tab] = getCurrentTab(path, tabs);

  if (currentTabIndex === -1) {
    if (tab) {
      history.push(tab.to);
    }

    return null;
  }

  return (
    <Tabs
      ref={connect}
      value={currentTabIndex}
      onChange={(event, value) => {
        const tab = tabs[value];
        history.push(tab.to);
      }}
      className={className}
    >
      {tabs.map((tab: Tab) => {
        return <MUITab key={tab.name} label={tab.name} className={className} />;
      })}
    </Tabs>
  );
}
