import { memo } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ResetButton } from "./ResetButton";
import styles from "./OptionsMenu.module.css";

interface OptionsMenuProps {
  onResetClick: () => void;
}

export const OptionsMenu = memo(({ onResetClick }: OptionsMenuProps) => {
  return (
    <div className={styles.OptionsMenu}>
      <ThemeToggle />
      <ResetButton onClick={onResetClick} />
    </div>
  );
});
