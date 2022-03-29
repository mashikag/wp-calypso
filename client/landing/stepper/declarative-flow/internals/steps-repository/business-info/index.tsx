import { StepContainer } from '@automattic/onboarding';
import { TextControl, CheckboxControl, SelectControl } from '@wordpress/components';
import { useI18n } from '@wordpress/react-i18n';
import FormattedHeader from 'calypso/components/formatted-header';
import { ActionSection, StyledNextButton } from 'calypso/signup/steps/woocommerce-install';
import { WOOCOMMERCE_DEFAULT_COUNTRY } from 'calypso/signup/steps/woocommerce-install/hooks/use-site-settings';
import { Step } from '../../types';
import './style.scss';

const BusinessInfo: Step = function BusinessInfoStep( { navigation } ) {
	const { goBack, goNext } = navigation;

	const { __ } = useI18n();

	/*************************************************************************************************/
	// Placeholders
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const intent = 'sell';
	const recordTracksEvent = () => {
		return;
	};
	const get = ( thing: any ) => {
		return '';
	};
	const getProfileValue = ( thing: any ) => {
		return '';
	};
	const getRevenueOptions = ( thing: any ) => {
		return '';
	};
	const updateProductTypes = ( thing: any ) => {
		return;
	};
	const updateProductCount = ( thing: any ) => {
		return;
	};
	const updateSellingVenues = ( thing: any ) => {
		return;
	};
	const getError = ( thing: any ) => {
		return '';
	};
	const save = () => {
		return;
	};
	const updateOnboardingProfile = ( field: string, value: any ) => {
		return;
	};

	const SupportCard = () => {
		return null;
	};
	/*************************************************************************************************/

	const getContent = () => {
		const productTypes = [
			{ label: __( 'Physical Products' ), value: 'physical' },
			{ label: __( 'Downloads' ), value: 'downloads' },
		];

		return (
			<>
				<div className="business-info__info-section" />
				<div className="business-info__instructions-container">
					<form
						onSubmit={ ( e ) => {
							e.preventDefault();
							updateOnboardingProfile( 'completed', true );
							save();
							goNext();
							return false;
						} }
					>
						<div className="business-info__components-group">
							<label className="business-info__components-group-label">
								{ __( 'What type of products will be listed? (optional)' ) }
							</label>

							{ productTypes.map( ( { label, value } ) => (
								<CheckboxControl
									label={ label }
									value={ value }
									key={ value }
									onChange={ () => updateProductTypes( value ) }
									checked={ getProfileValue( 'product_types' ).indexOf( value ) !== -1 }
								/>
							) ) }
						</div>

						<SelectControl
							label={ __( 'How many products do you plan to display? (optional)' ) }
							value={ getProfileValue( 'product_count' ) }
							options={ [
								{ value: '', label: '' },
								{ value: '0', label: __( "I don't have any products yet." ) },
								{ value: '1-10', label: __( '1-10' ) },
								{ value: '11-100', label: __( '11-101' ) },
								{ value: '101-1000', label: __( '101-1000' ) },
								{ value: '1000+', label: __( '1000+' ) },
							] }
							onChange={ updateProductCount }
						/>

						<SelectControl
							label={ __( 'Currently selling elsewhere? (optional)' ) }
							value={ getProfileValue( 'selling_venues' ) }
							options={ [
								{ value: '', label: '' },
								{ value: 'no', label: __( 'No' ) },
								{ value: 'other', label: __( 'Yes, on another platform' ) },
								{
									value: 'other-woocommerce',
									label: __( 'Yes, I own a different store powered by WooCommerce' ),
								},
								{
									value: 'brick-mortar',
									label: __( 'Yes, in person at physical stores and/or events' ),
								},
								{
									value: 'brick-mortar-other',
									label: __(
										'Yes, on another platform and in person at physical stores and/or events'
									),
								},
							] }
							onChange={ updateSellingVenues }
						/>

						{ [ 'other', 'brick-mortar', 'brick-mortar-other', 'other-woocommerce' ].includes(
							getProfileValue( 'selling_venues' )
						) && (
							<SelectControl
								label={ __( "What's your current annual revenue?" ) }
								value={ getProfileValue( 'revenue' ) }
								options={ getRevenueOptions( get( WOOCOMMERCE_DEFAULT_COUNTRY ) ) }
								onChange={ updateRevenue }
							/>
						) }

						{ [ 'other', 'brick-mortar-other' ].includes( getProfileValue( 'selling_venues' ) ) && (
							<>
								<SelectControl
									label={ __( 'Which platform is the store using? (optional)' ) }
									value={ getProfileValue( 'other_platform' ) }
									options={ [
										{ value: '', label: '' },
										{
											value: 'shopify',
											label: __( 'Shopify' ),
										},
										{
											value: 'bigcommerce',
											label: __( 'BigCommerce' ),
										},
										{
											value: 'magento',
											label: __( 'Magento' ),
										},
										{
											value: 'wix',
											label: __( 'Wix' ),
										},
										{
											value: 'amazon',
											label: __( 'Amazon' ),
										},
										{
											value: 'ebay',
											label: __( 'eBay' ),
										},
										{
											value: 'etsy',
											label: __( 'Etsy' ),
										},
										{
											value: 'squarespace',
											label: __( 'Squarespace' ),
										},
										{
											value: 'other',
											label: __( 'Other' ),
										},
									] }
									onChange={ updateOtherPlatform }
								/>

								{ getProfileValue( 'other_platform' ) === 'other' && (
									<TextControl
										label={ __( 'What is the platform name? (optional)' ) }
										onChange={ updateOtherPlatformName }
										value={ getProfileValue( 'other_platform_name' ) }
									/>
								) }
							</>
						) }

						<ActionSection>
							<SupportCard />
							<StyledNextButton type="submit">{ __( 'Continue' ) }</StyledNextButton>
						</ActionSection>
					</form>
				</div>
			</>
		);
	};

	const headerText = __( 'Tell us a bit about your business' );

	return (
		<div>
			<div className="business-info__steps">
				<div className="business-info__step is-business-info">
					<StepContainer
						stepName={ 'business-info' }
						className={ `is-${ intent }` }
						skipButtonAlign={ 'top' }
						goBack={ goBack }
						goNext={ goNext }
						isHorizontalLayout={ true }
						formattedHeader={
							<FormattedHeader
								id={ 'site-options-header' }
								headerText={ headerText }
								subHeaderText={ __( 'We will guide you to get started based on your responses.' ) }
								align={ 'left' }
							/>
						}
						stepContent={ getContent() }
						recordTracksEvent={ recordTracksEvent }
					/>
				</div>
			</div>
		</div>
	);
};

export default BusinessInfo;
