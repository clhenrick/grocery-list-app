import React, {
  KeyboardEvent,
  memo,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import styles from "./ListGroup.module.css";

interface Props {
  aisle: string;
  children?: React.ReactNode;
}

export const ListGroup = memo(({ aisle, children }: Props) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleTabIndex = (index: number, value: 0 | -1) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].tabIndex = value;
    }
  };

  const focusInput = (index: number) => {
    inputsRef.current?.[index]?.focus();
    handleTabIndex(index, 0);
  };

  const getIndex = () =>
    inputsRef.current.findIndex(
      (el: HTMLInputElement) =>
        el.dataset.id ===
        (document.activeElement as HTMLInputElement)?.dataset?.id
    );

  const focusNext = () => {
    const index = getIndex();
    const nexIndex = index + 1;
    if (inputsRef.current[nexIndex]) {
      focusInput(nexIndex);
    } else {
      focusFirst();
    }
    handleTabIndex(index, -1);
  };

  const focusPrev = () => {
    const index = getIndex();
    const prevIndex = index - 1;
    if (inputsRef.current[prevIndex]) {
      focusInput(prevIndex);
    } else {
      focusLast();
    }
    handleTabIndex(index, -1);
  };

  const focusFirst = () => {
    focusInput(0);
  };

  const focusLast = () => {
    focusInput(inputsRef.current.length - 1);
  };

  function handleKeydown(event: KeyboardEvent<HTMLUListElement>) {
    let flag = false;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        focusNext();
        flag = true;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        focusPrev();
        flag = true;
        break;
      case "Home":
        focusFirst();
        flag = true;
        break;
      case "End":
        focusLast();
        flag = true;
        break;
      default:
        break;
    }
    if (flag) {
      event.preventDefault();
    }
  }

  return (
    <details className={styles.details} open>
      <summary className={styles.categoryHeading}>{aisle}</summary>
      <ul onKeyDown={handleKeydown}>
        {React.Children.map(
          children as JSX.Element,
          (child: ReactElement, index) => {
            return React.cloneElement(child, {
              ref: (ref: HTMLInputElement) =>
                inputsRef.current ? (inputsRef.current[index] = ref) : null,
            });
          }
        )}
      </ul>
    </details>
  );
});
