import { useEffect, useState } from "react";
import styles from "./List.module.css";
import { IDatum, groupData, DataGrouped } from "../lib/data";
import { ListGroup } from "./ListGroup";
import { ListItem } from "./ListItem";
import { MessageNoItemsIncluded } from "./MessageNoItemsIncluded";

interface Props {
  data: IDatum[] | null;
  handleChange: (i: number) => void;
  preventFocus: boolean;
}

export function List({ data, handleChange, preventFocus }: Props) {
  const [grouped, setGrouped] = useState<DataGrouped[]>([]);

  useEffect(() => {
    if (data) {
      const grouped = groupData(data);
      setGrouped(grouped);
    }
  }, [data]);

  if (Array.isArray(grouped) && !grouped.length) {
    return <MessageNoItemsIncluded />;
  }

  return (
    <div
      className={styles.List}
      ref={(node) =>
        node && preventFocus
          ? node.setAttribute("inert", "")
          : node?.removeAttribute("inert")
      }
    >
      {grouped.map(({ aisle, items }) => {
        return (
          <ListGroup key={aisle} aisle={aisle}>
            {items.map((d, i) => (
              <ListItem
                key={d.id}
                index={i}
                datum={d}
                onChange={handleChange}
              />
            ))}
          </ListGroup>
        );
      })}
    </div>
  );
}
