import styles from "./MenuButton.module.css";

interface Props {
  icon: string;
  label: string;
  onClick: () => void;
}

export function MenuButton({ icon, label, onClick }: Props) {
  return (
    <button className={styles.MenuButton} onClick={onClick}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      {label}
    </button>
  );
}
