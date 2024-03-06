export const DATE_FORMATS = {
	TECH_FORMAT: "YYYY-MM-DD",
	DATE_FORMAT: "DD.MM.YYYY",
	HOUR_FORMAT: "HH:mm",
	FORM_FORMAT: `YYYY-MM-DDTHH:mm`,
} as const;

export type DATE_FORMAT = (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS];
