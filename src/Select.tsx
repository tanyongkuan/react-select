import { useEffect, useState } from 'react';
import styles from './select.module.css';

export type SelectOption = {
	label: string;
	value: string | number;
};

type SingleSelectProps = {
	multiple?: false;
	value?: SelectOption;
	onChange: (val: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
	multiple: true;
	value: Array<SelectOption>;
	onChange: (val: Array<SelectOption>) => void;
};

type SelectProps = {
	options: Array<SelectOption>;
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);

	const clearOptions = () => {
		multiple ? onChange([]) : onChange(undefined);
	};

	const selectOption = (selectOption: SelectOption) => {
		if (multiple) {
			if (value.includes(selectOption)) {
				onChange(value.filter((val) => val !== selectOption));
			} else {
				onChange([...value, selectOption]);
			}
		} else {
			if (selectOption !== value) {
				onChange(selectOption);
			}
		}
	};

	const isOptionSelected = (selectOption: SelectOption) => {
		return multiple ? value.includes(selectOption) : value === selectOption;
	};

	useEffect(() => {
		if (isOpen) {
			setHighlightedIndex(0);
		}
	}, [isOpen]);

	return (
		<div
			onClick={() => setIsOpen((prev) => !prev)}
			onBlur={() => setIsOpen(false)}
			tabIndex={0}
			className={styles.container}
		>
			<span className={styles.value}>
				{multiple
					? value.map((val) => (
							<button
								key={val.value}
								onClick={(e) => {
									e.stopPropagation();
									selectOption(val);
								}}
								className={styles['option-badge']}
							>
								{val.label}
								<span className={styles['remove-btn']}>&times;</span>
							</button>
					  ))
					: value?.label}
			</span>
			<button
				onClick={(e) => {
					e.stopPropagation();
					clearOptions();
				}}
				className={styles['clear-btn']}
			>
				&times;
			</button>
			<div className={styles.divider}></div>
			<div className={styles.caret}></div>
			<ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
				{options.map((option, index) => (
					<li
						onClick={(e) => {
							e.stopPropagation();
							selectOption(option);
							setIsOpen(false);
						}}
						onMouseEnter={() => setHighlightedIndex(index)}
						key={option.value}
						className={`${styles.option} ${
							isOptionSelected(option) ? styles.selected : ''
						} ${index === highlightedIndex ? styles.highlighted : ''}`}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}
