import './App.css';
import { useLoadData } from './hooks/use-load-data';
import {List} from "./List";
import {ThemeToggle} from "./ThemeToggle";

function App() {
	const [data, error] = useLoadData();

	// TODO: function that handles updating list items to be checked / unchecked.
	// function updateListItem(index: number) {
	// 	if (!data) return;
	// 	const datumCopy = { ...data[index] };
	// 	datumCopy.checked = !datumCopy.checked;
	// 	setData([
	// 		...data.slice(0, index),
	// 		datumCopy,
	// 		...data.slice(index + 1)
	// 	]);
	// }

  return (
    <div className="App">
      <header>
				<h1>Grocery List</h1>
				<ThemeToggle />
      </header>
			<main>
				{ data && <List data={data} />}
				{ error && <p>{error.message}</p>}
				{ !data && !error && <p>loading shopping list...</p>}
			</main>
    </div>
  );
}

export default App;
