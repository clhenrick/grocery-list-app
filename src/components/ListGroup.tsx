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

  useEffect(() => {
    console.log(inputsRef.current);
  }, [inputsRef]);

  const handleKeydown = (event: KeyboardEvent<HTMLUListElement>) => {
    console.log(event.key);
    let flag = false;

    switch (event.key) {
      case "ArrowDown":
        // focus next
        break;
      case "ArrowUp":
        // focus prev
        break;
      default:
        break;
    }

    if (flag) {
      event.preventDefault();
    }
  };

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
