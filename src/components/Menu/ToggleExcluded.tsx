import { memo } from "react";
import styles from "./ToggleExcluded.module.css";
import stylesShared from "./menu-button-shared.module.css";

interface Props {
  showExcludedItems: boolean;
  onClick: () => void;
}

export const ToggleExcludedItems = memo(
  ({ showExcludedItems, onClick }: Props) => {
    return (
      <button
        className={`${styles.ResetButton} ${stylesShared["menu-item-button"]}`}
        onClick={onClick}
      >
        <span
          aria-hidden="true"
          className={stylesShared["menu-item-button--icon"]}
        >
          {showExcludedItems ? "⚅" : "⚀"}
        </span>
        {`${showExcludedItems ? "Hide" : "Show"} excluded items`}
      </button>
    );
  }
);
