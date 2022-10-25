import { useState, useMemo, useCallback } from "react";
import styles from "./App.module.css";
import { useData } from "../hooks/use-data";
import { List } from "./List";
import { Menu } from "./Menu";
import { MenuToggleBtn } from "./MenuToggleBtn";

function App() {
  const { data: dataRaw, error, updateData, resetData } = useData();
  const [filterIncluded, setFilterIncluded] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const data = useMemo(
    () => (filterIncluded ? dataRaw?.filter((d) => d.include) : dataRaw),
    [dataRaw, filterIncluded]
  );

  const toggleListItemChecked = useCallback(
    (id: number) => {
      if (dataRaw) {
        const index = dataRaw.findIndex((d) => d.id === id);
        if (index === -1) return;
        const datum = dataRaw[index];
        const datumUpdated = { ...datum, checked: !datum.checked };
        updateData([
          ...dataRaw.slice(0, index),
          datumUpdated,
          ...dataRaw.slice(index + 1),
        ]);
      }
    },
    [dataRaw]
  );

  function toggleMenuVisibility() {
    setMenuVisible(!menuVisible);
  }

  return (
    <div className={styles.App}>
      <header>
        <h1>Grocery List</h1>
        <MenuToggleBtn onClick={toggleMenuVisibility} expanded={menuVisible} />
      </header>
      <Menu
        visible={menuVisible}
        onCloseClick={toggleMenuVisibility}
        onResetClick={resetData}
        onToggleExcludedClick={() => setFilterIncluded(!filterIncluded)}
        showExcludedItems={!filterIncluded}
      />
      <main>
        {data && (
          <List
            data={data}
            handleChange={toggleListItemChecked}
            preventFocus={menuVisible}
          />
        )}
        {error && <p>{error.message}</p>}
        {!data && !error && <p>loading shopping list...</p>}
      </main>
    </div>
  );
}

export default App;
