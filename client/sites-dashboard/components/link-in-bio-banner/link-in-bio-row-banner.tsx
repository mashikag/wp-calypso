import styled from '@emotion/styled';
import image from 'calypso/assets/images/onboarding/link-in-bio-banner-small.png';
import * as Banner from './link-in-bio-banner-parts';

const Root = styled( Banner.Root )( {
	padding: 32,
	gap: 32,
	alignItems: 'center',
	'.banner-image': {
		width: 185,
	},
	'.create-button': {
		whiteSpace: 'nowrap',
	},
} );

const Details = styled( 'div' )( {
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
} );

export const LinkInBioRowBanner = () => {
	return (
		<Root data-testid="row-banner">
			<Banner.Image src={ image } />
			<Details>
				<Banner.Title />
				<Banner.Description />
			</Details>
			<Banner.CreateButton />
			<Banner.DismissButton />
		</Root>
	);
};
