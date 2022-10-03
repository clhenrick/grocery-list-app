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

  // useEffect(() => {
  //   console.log(inputsRef.current);
  // }, [inputsRef]);

  const focusInput = (index: number) => inputsRef.current?.[index]?.focus();

  const getIndex = () =>
    inputsRef.current.findIndex(
      (el: HTMLInputElement) =>
        el.dataset.id ===
        (document.activeElement as HTMLInputElement)?.dataset?.id
    );

  const focusNext = () => {
    const index = getIndex() + 1;
    if (inputsRef.current[index]) {
      focusInput(index);
    } else {
      focusFirst();
    }
  };

  const focusPrev = () => {
    const index = getIndex() - 1;
    if (inputsRef.current[index]) {
      focusInput(index);
    } else {
      focusLast();
    }
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
