import { forwardRef, KeyboardEvent, memo } from "react";
import styles from "./ListItem.module.css";
import { sanitize } from "../lib/utils";

export interface Props {
  datum: {
    id: number;
    item: string;
    checked: boolean;
    include: boolean;
  };
  index: number;
  onChange: (id: number) => void;
  tabIndex?: number;
  onKeyDown?: (event: KeyboardEvent, index: number) => void;
  ref?: (ref: HTMLElement) => void;
}

type Ref = HTMLInputElement;

export const ListItem = memo(
  forwardRef<Ref, Props>(
    ({ datum, onChange, onKeyDown, tabIndex, index }, ref) => {
      const { item, id, checked, include } = datum;
      const htmlId = sanitize(item);

      return (
        <li className={styles.ListItem}>
          <input
            ref={ref}
            id={htmlId}
            data-id={id}
            type="checkbox"
            checked={checked}
            tabIndex={tabIndex}
            onChange={() => onChange(id)}
            onKeyDown={(event) => onKeyDown?.(event, index)}
          />{" "}
          <label
            className={include ? styles.label : styles["label-not-included"]}
            htmlFor={htmlId}
          >
            {item}
          </label>
        </li>
      );
    }
  )
);
