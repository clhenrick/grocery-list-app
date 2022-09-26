import { memo, useState, useEffect } from "react";
import styles from "./ResetButton.module.css";
import stylesShared from "./menu-button-shared.module.css";

interface Props {
  onClick: () => void;
}

export const ResetButton = memo(({ onClick }: Props) => {
  const [verified, setVerified] = useState(false);
  const handleClick = () => {
    if (!verified && window.confirm("Reset shopping list?")) {
      setVerified(true);
    }
  };

  useEffect(() => {
    if (verified) {
      onClick();
    }
    return () => {
      setVerified(false);
    };
  }, [verified, onClick]);

  return (
    <button
      className={`${styles.ResetButton} ${stylesShared["menu-item-button"]}`}
      onClick={handleClick}
    >
      <span className={styles.icon} aria-hidden="true">
        {"🔄 "}
      </span>
      {"Refresh grocery list"}
    </button>
  );
});
