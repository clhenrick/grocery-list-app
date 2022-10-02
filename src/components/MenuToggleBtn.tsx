interface Props {
  onClick: () => void;
  expanded: boolean;
}

export function MenuToggleBtn({ onClick, expanded }: Props) {
  return (
    <button onClick={onClick} aria-label="view menu" aria-expanded={expanded}>
      <svg height="48px" viewBox="0 0 24 24" width="48px" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </button>
  );
}
