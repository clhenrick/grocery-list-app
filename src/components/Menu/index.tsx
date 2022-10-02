import { useEffect, useRef } from "react";
import { CloseButton } from "./CloseButton";
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
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    if (visible) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      dialog.current?.showModal();
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      dialog.current?.close();
    }
  }, [visible, dialog]);

  return (
    <dialog ref={dialog} className={styles.Menu}>
      <div className={styles.MenuHeader}>
        <h2>Options</h2>
        <CloseButton onClick={onCloseClick} />
      </div>
      <div className={styles.MenuItems}>
        {/** TODO: buttons could share similar code? */}
        <ResetButton onClick={onResetClick} />
        <ThemeToggle />
        <ToggleExcludedItems
          onClick={onToggleExcludedClick}
          showExcludedItems={showExcludedItems}
        />
      </div>
    </dialog>
  );
}
