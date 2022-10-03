import { forwardRef, memo } from "react";
import styles from "./ListItem.module.css";
import { sanitize } from "../lib/utils";

interface Props {
  datum: {
    id: number;
    item: string;
    checked: boolean;
    include: boolean;
  };
  index: number;
  onChange: (id: number) => void;
}

type Ref = HTMLInputElement;

export const ListItem = memo(
  forwardRef<Ref, Props>(({ datum, onChange }, ref) => {
    const { item, id, checked, include } = datum;
    const htmlId = sanitize(item);

    console.log("ListItem render");

    return (
      <li className={styles.ListItem}>
        <input
          ref={ref}
          id={htmlId}
          data-id={id}
          type="checkbox"
          checked={checked}
          onChange={() => onChange(id)}
        />{" "}
        <label
          className={include ? styles.label : styles["label-not-included"]}
          htmlFor={htmlId}
        >
          {item}
        </label>
      </li>
    );
  })
);
