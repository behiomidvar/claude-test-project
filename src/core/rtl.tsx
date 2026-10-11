import React from 'react';

/**
 * Persian / RTL helpers. Scenes are dir="rtl"; use logical properties only
 * (inset-inline-start, margin-inline-end, padding-block, text-align: start).
 */

/** Isolates a Latin run (brand name, URL, handle) inside RTL text. */
export const Ltr: React.FC<{readonly children: React.ReactNode}> = ({children}) => (
	<span dir="ltr" style={{unicodeBidi: 'isolate'}}>
		{children}
	</span>
);

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** 0-9 and Arabic-Indic digits (U+0660-0669) to Persian digits ۰-۹. */
export const faDigits = (input: string | number) =>
	String(input)
		.replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)])
		.replace(/[\u0660-\u0669]/g, (d) => FA_DIGITS[d.charCodeAt(0) - 0x0660]);

/** Persian punctuation. Use these, not «,» «?» «;». */
export const FA_PUNCT = {
	comma: '،',
	question: '؟',
	semicolon: '؛',
	quoteOpen: '«',
	quoteClose: '»',
} as const;

/** Zero-width non-joiner (نیم‌فاصله). */
export const ZWNJ = '‌';
