import classNames from 'classnames';
import { numberFormat, translate } from 'i18n-calypso';
import { capitalize } from 'lodash';
import moment from 'moment';
import memoizeLast from 'calypso/lib/memoize-last';
import { rangeOfPeriod } from 'calypso/state/stats/lists/utils';

export function formatDate( date, period ) {
	// NOTE: Consider localizing the dates, especially for the 'week' case.
	const momentizedDate = moment( date );
	switch ( period ) {
		case 'day':
			return momentizedDate.format( 'LL' );
		case 'week':
			return momentizedDate.format( 'L' ) + ' - ' + momentizedDate.add( 6, 'days' ).format( 'L' );
		case 'month':
			return momentizedDate.format( 'MMMM YYYY' );
		case 'year':
			return momentizedDate.format( 'YYYY' );
		default:
			return null;
	}
}

export function getQueryDate( queryDate, timezoneOffset, period, quantity ) {
	const momentSiteZone = moment().utcOffset( timezoneOffset );
	const endOfPeriodDate = rangeOfPeriod( period, momentSiteZone.locale( 'en' ) ).endOf;
	const periodDifference = moment( endOfPeriodDate ).diff( moment( queryDate ), period );
	if ( periodDifference >= quantity ) {
		return moment( endOfPeriodDate )
			.subtract( Math.floor( periodDifference / quantity ) * quantity, period )
			.format( 'YYYY-MM-DD' );
	}
	return endOfPeriodDate;
}

const EMPTY_RESULT = [];

// `activeLegend` is used to display a (chart) bar in a bar. After deleting a legend on the Stats page, the property is redudnant and
// always receives an empty array. I didn't remove the argument in case other places use it.
// Side note: passing an empty array in a connect() method breaks the memoization, it has to come as a prop, not from within connect() - otherwise,
// chart's x-axis width or the amount of visible points is calclulated incorrectly
export const buildChartData = memoizeLast( ( activeLegend, chartTab, data, period, queryDate ) => {
	if ( ! data ) {
		return EMPTY_RESULT;
	}
	return data.map( ( record ) => {
		const nestedValue = activeLegend.length ? record[ activeLegend[ 0 ] ] : null;

		const recordClassName =
			record.classNames && record.classNames.length ? record.classNames.join( ' ' ) : null;
		const className = classNames( recordClassName, {
			'is-selected': record.period === queryDate,
		} );

		const item = addTooltipData(
			chartTab,
			{
				label: record[ `label${ capitalize( period ) }` ],
				value: record[ chartTab ],
				data: record,
				nestedValue,
				className,
			},
			period
		);

		return item;
	} );
} );

function addTooltipData( chartTab, item, period ) {
	const tooltipData = [];
	tooltipData.push( {
		label: formatDate( item.data.period, period ),
		className: 'is-date-label',
		value: null,
	} );

	switch ( chartTab ) {
		case 'comments':
			tooltipData.push( {
				label: translate( 'Comments' ),
				value: numberFormat( item.value ),
				className: 'is-comments',
				icon: 'comment',
			} );
			break;

		case 'likes':
			tooltipData.push( {
				label: translate( 'Likes' ),
				value: numberFormat( item.value ),
				className: 'is-likes',
				icon: 'star',
			} );
			break;

		default:
			tooltipData.push( {
				label: translate( 'Views' ),
				value: numberFormat( item.data.views ),
				className: 'is-views',
				icon: 'visible',
			} );
			tooltipData.push( {
				label: translate( 'Visitors' ),
				value: numberFormat( item.data.visitors ),
				className: 'is-visitors',
				icon: 'user',
			} );
			tooltipData.push( {
				label: translate( 'Views Per Visitor' ),
				value: numberFormat( item.data.views / item.data.visitors, { decimals: 2 } ),
				className: 'is-views-per-visitor',
				icon: 'chevron-right',
			} );

			if ( item.data.post_titles && item.data.post_titles.length ) {
				// only show two post titles
				if ( item.data.post_titles.length > 2 ) {
					tooltipData.push( {
						label: translate( 'Posts Published' ),
						value: numberFormat( item.data.post_titles.length ),
						className: 'is-published-nolist',
						icon: 'posts',
					} );
				} else {
					tooltipData.push( {
						label:
							translate( 'Post Published', 'Posts Published', {
								textOnly: true,
								count: item.data.post_titles.length,
							} ) + ':',
						className: 'is-published',
						icon: 'posts',
						value: '',
					} );
					item.data.post_titles.forEach( ( post_title ) => {
						tooltipData.push( {
							className: 'is-published-item',
							label: post_title,
						} );
					} );
				}
			}
			break;
	}

	return { ...item, tooltipData };
}
