import React, { type ChangeEvent } from "react";
import { Input } from "./input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	precision?: number; // Optional number of decimal places
}

const AmountInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ value, precision, onChange, ...props }, ref) => {
		const min = props.min ? Number(props.min) : 0;
		const max = props.max ? Number(props.max) : 9999;

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			// Remove non-numeric and non-separator characters
			const sanitizedValue = e.target.value.replace(/[^0-9.]/g, "");

			// Replace multiple consecutive separators with a single one
			const normalizedValue = sanitizedValue.replace(/([.])\1+/g, "$1");

			// Ensure there is only one dot or comma for decimal separator
			const normalizedValue2 = normalizedValue.replace(/([.]).*([.])/g, "$1");

			// Apply decimal places precision
			const roundedValue = roundValue(normalizedValue2, precision ?? 2);

			// Enforce maximum and minimum limits
			const clampedValue = clampValue(roundedValue, min, max);

			e.target.value = clampedValue;
			if (onChange) onChange(e);
		};

		const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
			if (e.target.value.endsWith(".0")) {
				e.target.value = e.target.value.replace(/\.0/g, ".00");
			} else if (e.target.value === ".") {
				e.target.value = "0";
			} else if (e.target.value.endsWith(".")) {
				e.target.value = e.target.value.replace(/[.]/g, ".00");
			} else if (!e.target.value.includes(".") && e.target.value) {
				e.target.value = e.target.value.concat(".00");
			}

			if (onChange) onChange(e);
		};

		return (
			<Input
				type="text"
				value={value}
				ref={ref}
				{...props}
				onBlur={handleBlur}
				onChange={handleChange}
			/>
		);
	},
);

function clampValue(value: string, min?: number, max?: number) {
	const parsedValue = Number(value);
	if (max !== undefined && parsedValue > max) {
		return String(max);
	}

	if (min !== undefined && parsedValue < min) {
		return String(min);
	}

	return value;
}

function roundValue(inputString: string, precision = 2) {
	const delimiter = ".";
	const parts = inputString.split(delimiter);
	if (parts.length === 2 && parts[1].length > precision) {
		return inputString.substring(0, inputString.length - 1);
	}

	return inputString;
}

AmountInput.displayName = "AmountInput";

export default AmountInput;
