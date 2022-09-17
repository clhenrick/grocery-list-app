import { memo } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ResetButton } from "./ResetButton";
import { ToggleExcludedItems } from "./ToggleExcluded";
import styles from "./OptionsMenu.module.css";

interface OptionsMenuProps {
  onResetClick: () => void;
  onToggleExcludedClick: () => void;
  showExcludedItems: boolean;
}

export const OptionsMenu = memo(
  ({
    onResetClick,
    onToggleExcludedClick,
    showExcludedItems,
  }: OptionsMenuProps) => {
    return (
      <div className={styles.OptionsMenu}>
        <ThemeToggle />
        <ResetButton onClick={onResetClick} />
        <ToggleExcludedItems
          onClick={onToggleExcludedClick}
          showExcludedItems={showExcludedItems}
        />
      </div>
    );
  }
);
