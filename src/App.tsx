import './App.css';
import { useData } from './hooks/use-data';
import {List} from "./List";
import {ThemeToggle} from "./ThemeToggle";
import {ResetButton} from "./ResetButton";

function App() {
	const {data, error, updateData, resetData } = useData();

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
				<div className="options-menu">
					<ThemeToggle />
					<ResetButton onClick={resetData} />
				</div>
      </header>
			<main>
				{ data && <List data={data} handleChange={updateListItem} />}
				{ error && <p>{error.message}</p>}
				{ !data && !error && <p>loading shopping list...</p>}
			</main>
    </div>
  );
}

export default App;
