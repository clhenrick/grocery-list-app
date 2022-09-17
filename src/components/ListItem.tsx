import React, { memo } from "react";
import styles from "./ListItem.module.css";
import { sanitize } from "../lib/utils";

interface Props {
  datum: {
    id: number;
    item: string;
    checked: boolean;
    include: boolean;
  };
  onChange: (id: number) => void;
}

export const ListItem = memo(({ datum, onChange }: Props) => {
  const { item, id, checked, include } = datum;
  const htmlId = sanitize(item);

  return (
    <li className={styles.ListItem}>
      <input
        id={htmlId}
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
});
