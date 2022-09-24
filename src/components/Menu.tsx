import { ResetButton } from "./ResetButton";
import { ThemeToggle } from "./ThemeToggle";
import { ToggleExcludedItems } from "./ToggleExcluded";

import styles from "./Menu.module.css";

interface MenuProps {
  visible: boolean;
  onCloseClick: () => void;
  onResetClick: () => void;
  onToggleExcludedClick: () => void;
  showExcludedItems: boolean;
}

export function Menu({
  visible,
  onCloseClick,
  onResetClick,
  onToggleExcludedClick,
  showExcludedItems,
}: MenuProps) {
  return (
    <div className={`${styles.Menu} ${visible ? styles.visible : ""}`}>
      <button className={styles.MenuCloseBtn} onClick={onCloseClick}>
        {"✕"}
      </button>
      <div className={styles.MenuItems}>
        <ResetButton onClick={onResetClick} />
        <ThemeToggle />
        <ToggleExcludedItems
          onClick={onToggleExcludedClick}
          showExcludedItems={showExcludedItems}
        />
      </div>
    </div>
  );
}
