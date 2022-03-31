import { Design, DesignPreviewOptions } from '../../types';
import { isBlankCanvasDesign } from '../available-designs';
import { getDesignPreviewUrl } from '../designs';

jest.mock( '@automattic/calypso-config', () => ( {
	isEnabled: () => false,
} ) );

describe( 'Design Picker designs utils', () => {
	describe( 'getDesignPreviewUrl', () => {
		const design = {
			title: 'Zoologist',
			recipe: {
				theme: 'pub/zoologist',
				pattern_ids: [ 12, 34 ],
			},
		} as Design;

		it( 'returns the block-previews/site endpoint with the correct query params', () => {
			expect( getDesignPreviewUrl( design, {} ) ).toEqual(
				'https://public-api.wordpress.com/wpcom/v2/block-previews/site?theme=pub%2Fzoologist&pattern_ids=12%2C34&viewport_height=700&site_title=Zoologist'
			);
		} );

		it( 'adds the preview options to the query params', () => {
			const options: DesignPreviewOptions = {
				language: 'id',
				site_title: 'Design Title',
			};

			expect( getDesignPreviewUrl( design, options ) ).toEqual(
				'https://public-api.wordpress.com/wpcom/v2/block-previews/site?theme=pub%2Fzoologist&pattern_ids=12%2C34&language=id&viewport_height=700&site_title=Design%20Title'
			);
		} );

		// Parentheses in uri components don't usually need to be escaped, but because the design url sometimes appears
		// in a `background-url: url( ... )` CSS rule the parentheses will break it.
		it( 'escapes parentheses within the site title', () => {
			const options: DesignPreviewOptions = {
				site_title: 'Mock(Design)(Title)',
			};

			expect( getDesignPreviewUrl( design, options ) ).toEqual(
				'https://public-api.wordpress.com/wpcom/v2/block-previews/site?theme=pub%2Fzoologist&pattern_ids=12%2C34&viewport_height=700&site_title=Mock%28Design%29%28Title%29'
			);
		} );
	} );

	describe( 'isBlankCanvasDesign', () => {
		it( 'should match any design that contains "blank-canvas" in its slug', () => {
			const mockDesign = {
				title: 'Mock',
				slug: 'mock-blank-canvas-design-slug',
				template: 'mock-blank-canvas-design-template',
				theme: 'mock-blank-canvas-design-theme',
				categories: [ { slug: 'featured', name: 'Featured' } ],
				is_premium: false,
				features: [],
			};
			expect( isBlankCanvasDesign( mockDesign ) ).toBeTruthy();

			mockDesign.slug = 'Blank-CanvAS';
			expect( isBlankCanvasDesign( mockDesign ) ).toBeTruthy();

			mockDesign.slug = 'blank-canva';
			expect( isBlankCanvasDesign( mockDesign ) ).toBeFalsy();
		} );
		it( 'should return false when no design is provided', () => {
			expect( isBlankCanvasDesign() ).toBeFalsy();
		} );
		it( 'should return false when undefined is provided', () => {
			expect( isBlankCanvasDesign( undefined ) ).toBeFalsy();
		} );
	} );
} );
