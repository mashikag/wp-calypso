import type { FONT_PAIRINGS } from './constants';
import type { ValuesType } from 'utility-types';

export type Font = ValuesType< ValuesType< typeof FONT_PAIRINGS > >;

// Deprecated; used for Gutenboarding (/new flow)
export interface FontPair {
	headings: Font;
	base: Font;
}

export interface Category {
	slug: string;
	name: string;
}

export interface DesignRecipe {
	theme?: string;
	pattern_ids?: number[];
}

export type DesignFeatures = 'anchorfm' | 'difm-lite-default'; // For additional features, = 'anchorfm' | 'feature2' | 'feature3'

export interface Design {
	slug: string;
	title: string;
	recipe?: DesignRecipe;
	is_premium: boolean;
	categories: Category[];
	features: DesignFeatures[];
	is_featured_picks?: boolean; // Whether this design will be featured in the sidebar. Example: Blank Canvas
	showFirst?: boolean; // Whether this design will appear at the top, regardless of category

	/* Deprecated; used for Gutenboarding (/new flow) */
	stylesheet?: string;
	template: string;
	theme: string;
	fonts?: FontPair;
	is_alpha?: boolean;
	is_fse?: boolean;
	preview?: 'static';
	hide?: boolean;
}

export interface DesignPreviewOptions {
	language?: string;
	site_title?: string;
}

// Deprecated; used for Gutenboarding (/new flow)
export interface DesignUrlOptions {
	iframe?: boolean;
	site_title?: string;
}
