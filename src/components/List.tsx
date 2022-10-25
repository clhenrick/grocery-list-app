import { useEffect, useState, memo } from "react";
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

export const List = memo(({ data, handleChange, preventFocus }: Props) => {
  const [grouped, setGrouped] = useState<DataGrouped[]>([]);

  useEffect(() => {
    if (data) {
      // FIXME: causes all ListItems to re-render each time an item is (un)checked
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
});
