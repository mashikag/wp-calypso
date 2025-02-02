import {
	POST_TYPES_TAXONOMIES_RECEIVE,
	POST_TYPES_TAXONOMIES_REQUEST,
	POST_TYPES_TAXONOMIES_REQUEST_SUCCESS,
	POST_TYPES_TAXONOMIES_REQUEST_FAILURE,
} from 'calypso/state/action-types';
import useNock from 'calypso/test-helpers/use-nock';
import { receivePostTypeTaxonomies, requestPostTypeTaxonomies } from '../actions';

describe( 'actions', () => {
	let spy;

	beforeEach( () => {
		spy = jest.fn();
	} );

	describe( '#receivePostTypeTaxonomies()', () => {
		test( 'should return an action object', () => {
			const action = receivePostTypeTaxonomies( 2916284, 'post', [
				{ name: 'category', label: 'Categories' },
			] );

			expect( action ).toEqual( {
				type: POST_TYPES_TAXONOMIES_RECEIVE,
				siteId: 2916284,
				postType: 'post',
				taxonomies: [ { name: 'category', label: 'Categories' } ],
			} );
		} );
	} );

	describe( '#requestPostTypeTaxonomies()', () => {
		useNock( ( nock ) => {
			nock( 'https://public-api.wordpress.com:443' )
				.persist()
				.get( '/rest/v1.1/sites/2916284/post-types/post/taxonomies' )
				.reply( 200, {
					found: 2,
					taxonomies: [
						{ name: 'category', label: 'Categories' },
						{ name: 'post_tag', label: 'Tags' },
					],
				} )
				.get( '/rest/v1.1/sites/2916284/post-types/foo/taxonomies' )
				.reply( 404, {
					error: 'unknown_post_type',
					message: 'Unknown post type',
				} );
		} );

		test( 'should dispatch fetch action when thunk triggered', () => {
			requestPostTypeTaxonomies( 2916284, 'post' )( spy );

			expect( spy ).toBeCalledWith( {
				type: POST_TYPES_TAXONOMIES_REQUEST,
				siteId: 2916284,
				postType: 'post',
			} );
		} );

		test( 'should dispatch receive action when request completes', () => {
			return requestPostTypeTaxonomies(
				2916284,
				'post'
			)( spy ).then( () => {
				expect( spy ).toBeCalledWith(
					receivePostTypeTaxonomies( 2916284, 'post', [
						{ name: 'category', label: 'Categories' },
						{ name: 'post_tag', label: 'Tags' },
					] )
				);
			} );
		} );

		test( 'should dispatch request success action when request completes', () => {
			return requestPostTypeTaxonomies(
				2916284,
				'post'
			)( spy ).then( () => {
				expect( spy ).toBeCalledWith( {
					type: POST_TYPES_TAXONOMIES_REQUEST_SUCCESS,
					siteId: 2916284,
					postType: 'post',
				} );
			} );
		} );

		test( 'should dispatch fail action when request fails', () => {
			return requestPostTypeTaxonomies(
				2916284,
				'foo'
			)( spy ).then( () => {
				expect( spy ).toBeCalledWith( {
					type: POST_TYPES_TAXONOMIES_REQUEST_FAILURE,
					siteId: 2916284,
					postType: 'foo',
					error: expect.objectContaining( { message: 'Unknown post type' } ),
				} );
			} );
		} );
	} );
} );
