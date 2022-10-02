import { memo, useState, useEffect } from "react";
import stylesShared from "./menu-button-shared.module.css";

interface Props {
  onClick: () => void;
}

const confirmationText = `Refresh shopping list?\n\nThis will clear all checked items and get the latest spreadsheet data.`;

export const ResetButton = memo(({ onClick }: Props) => {
  const [verified, setVerified] = useState(false);
  const handleClick = () => {
    if (!verified && window.confirm(confirmationText)) {
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
    <button className={stylesShared["menu-item-button"]} onClick={handleClick}>
      <span
        className={stylesShared["menu-item-button--icon"]}
        aria-hidden="true"
      >
        {"🔄 "}
      </span>
      {"Refresh grocery list"}
    </button>
  );
});
