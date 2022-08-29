import { useState } from "react";
import './App.css';
import { useData } from '../hooks/use-data';
import { List } from "./List";
import { OptionsMenu } from "./OptionsMenu";

function App() {
	const {data, error, updateData, resetData } = useData();
	const [ filterIncluded, setFilterIncluded ] = useState(true);

	function updateListItem(index: number) {
		if (data) {
			const datumCopy = { ...data[index] };
			datumCopy.checked = !datumCopy.checked;
			updateData([
				...data.slice(0, index),
				datumCopy,
				...data.slice(index + 1)
			]);
		}
	}

  return (
    <div className="App">
      <header>
				<h1>Grocery List</h1>
				<OptionsMenu
					onResetClick={resetData}
					onToggleExcludedClick={() => setFilterIncluded(!filterIncluded)}
					showExcludedItems={!filterIncluded}
				/>
      </header>
			<main>
				{ data &&
					<List
						data={data}
						handleChange={updateListItem}
						filterIncluded={filterIncluded}
					/>
				}
				{ error && <p>{error.message}</p>}
				{ !data && !error && <p>loading shopping list...</p>}
			</main>
    </div>
  );
}

export default App;
