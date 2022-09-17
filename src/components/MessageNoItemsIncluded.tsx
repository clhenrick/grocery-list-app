import styles from "./MessageNoItemsIncluded.module.css";

export const MessageNoItemsIncluded = () => (
  <div className={styles.MessageNoItemsIncluded}>
    <p>
      <em>No items are currently included.</em>
    </p>
    <p>
      <strong>Tip:</strong> Tap the toggle included button above to view items
      not checked / included in the Google Sheet.
    </p>
  </div>
);
