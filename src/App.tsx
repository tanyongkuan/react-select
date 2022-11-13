import { useState } from 'react';
import { Select } from './Select';
import type { SelectOption } from './Select';

const options: Array<SelectOption> = [
	{ label: 'First', value: 1 },
	{ label: 'Second', value: 2 },
	{ label: 'Third', value: 3 },
	{ label: 'Fourth', value: 4 },
	{ label: 'Fifth', value: 5 },
];

function App() {
	const [value, setValue] = useState<SelectOption | undefined>(undefined);
	const [mulValue, setMulValue] = useState<Array<SelectOption>>([]);

	return (
		<>
			<Select options={options} value={value} onChange={(o) => setValue(o)} />
			<br />
			<Select
				multiple
				options={options}
				value={mulValue}
				onChange={(o) => setMulValue(o)}
			/>
		</>
	);
}

export default App;
