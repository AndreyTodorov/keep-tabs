import * as React from "react";

import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false);

		return (
			<div className="flex items-center gap-2">
				<Input
					type={showPassword ? "text" : "password"}
					className={className}
					ref={ref}
					{...props}
				/>
				{showPassword ? (
					<EyeIcon onClick={() => setShowPassword(false)} />
				) : (
					<EyeOffIcon onClick={() => setShowPassword(true)} />
				)}
			</div>
		);
	},
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
