import { memo } from "react";
import stylesShared from "./menu-button-shared.module.css";

interface Props {
  showExcludedItems: boolean;
  onClick: () => void;
}

export const ToggleExcludedItems = memo(
  ({ showExcludedItems, onClick }: Props) => {
    return (
      <button
        className={stylesShared["menu-item-button"]}
        onClick={onClick}
        aria-pressed={showExcludedItems}
      >
        <svg height="48px" viewBox="0 0 24 24" width="48px" fill="currentColor">
          {showExcludedItems ? (
            <>
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </>
          ) : (
            <>
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </>
          )}
        </svg>
        {"Show excluded items"}
      </button>
    );
  }
);
