import React, {
  isValidElement,
  memo,
  PropsWithChildren,
  ReactElement,
} from "react";
import styles from "./ListGroup.module.css";
import { useRovingTabIndex } from "../hooks/use-roving-tab-index";
import { ListItem, Props as ListItemProps } from "./ListItem";

interface Props {
  aisle: string;
  children?: React.ReactNode;
}

export const ListGroup = memo(({ aisle, children }: Props) => {
  const numberOfChildren = React.Children.count(children);
  const lastTargetIndex = numberOfChildren > 0 ? numberOfChildren - 1 : 0;

  const { handleKeyDown, getTabIndex, setFocusTargetRef } =
    useRovingTabIndex(lastTargetIndex);

  return (
    <details className={styles.details} open>
      <summary className={styles.categoryHeading}>{aisle}</summary>
      <ul>
        {React.Children.map(children, (child, index) => {
          if (isValidElement(child) && child.type === ListItem) {
            return React.cloneElement(
              child as ReactElement<PropsWithChildren<ListItemProps>>,
              {
                ref: (ref: HTMLElement) => setFocusTargetRef(ref, index),
                tabIndex: getTabIndex(index),
                onKeyDown: handleKeyDown,
              }
            );
          }
          return child;
        })}
      </ul>
    </details>
  );
});
