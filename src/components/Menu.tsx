import { useEffect } from "react";

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
  useEffect(() => {
    // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    if (visible) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [visible]);

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
