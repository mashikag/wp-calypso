import { StepContainer } from '@automattic/onboarding';
import styled from '@emotion/styled';
import { TextControl, ComboboxControl } from '@wordpress/components';
import { useI18n } from '@wordpress/react-i18n';
import { ReactElement } from 'react';
import storeImageUrl from 'calypso/assets/images/onboarding/store-onboarding.svg';
import FormattedHeader from 'calypso/components/formatted-header';
import FormInputValidation from 'calypso/components/forms/form-input-validation';
import { ActionSection, StyledNextButton } from 'calypso/signup/steps/woocommerce-install';
import {
	WOOCOMMERCE_STORE_ADDRESS_1,
	WOOCOMMERCE_STORE_ADDRESS_2,
	WOOCOMMERCE_STORE_CITY,
	WOOCOMMERCE_DEFAULT_COUNTRY,
	WOOCOMMERCE_STORE_POSTCODE,
	WOOCOMMERCE_ONBOARDING_PROFILE,
} from 'calypso/signup/steps/woocommerce-install/hooks/use-site-settings';
import type { Step } from 'calypso/signup/steps/types';
import './style.scss';

const CityZipRow = styled.div`
	display: -ms-grid;
	display: grid;
	width: 100%;
	-ms-grid-columns: 48% 4% 48%;
	grid-template-columns: 48% 48%;
	grid-column-gap: 4%;
	justify-items: stretch;
`;

const StoreAddress: Step = function StartingPointStep( { navigation } ) {
	const { goBack, goNext, submit } = navigation;

	const { __ } = useI18n();

	/*************************************************************************************************/
	// TODO - Dummy values
	const intent = 'sell';
	const recordTracksEvent = () => {
		return;
	};
	const get = ( thing: any ) => {
		return '';
	};
	const update = ( thing: any, value: any ) => {
		return;
	};
	const clearError = ( thing: any ) => {
		return;
	};
	const getError = ( thing: any ) => {
		return '';
	};
	const getProfileEmail = () => {
		return '';
	};
	const updateProfileEmail = ( value: any ) => {
		return;
	};
	const errors = {};
	const countriesList: string[] = [];
	const SupportCard = () => {
		return null;
	};
	/*************************************************************************************************/

	const countriesAsOptions = Object.entries( countriesList ).map( ( [ key, value ] ) => {
		return { value: key, label: value };
	} );

	const address1Error = getError( WOOCOMMERCE_STORE_ADDRESS_1 );
	const address2Error = getError( WOOCOMMERCE_STORE_ADDRESS_2 );
	const countryError = getError( WOOCOMMERCE_DEFAULT_COUNTRY );
	const cityError = getError( WOOCOMMERCE_STORE_CITY );
	const postcodeError = getError( WOOCOMMERCE_STORE_POSTCODE );
	const emailError = getError( WOOCOMMERCE_ONBOARDING_PROFILE );

	const getContent = () => {
		return (
			<>
				<div className="step-store-address__info-section" />
				<div className="step-store-address__instructions-container">
					<form
						onSubmit={ ( e ) => {
							e.preventDefault();

							submit();
						} }
					>
						<TextControl
							label={ __( 'Address line 1' ) }
							value={ get( WOOCOMMERCE_STORE_ADDRESS_1 ) }
							onChange={ ( value ) => {
								update( WOOCOMMERCE_STORE_ADDRESS_1, value );
								clearError( WOOCOMMERCE_STORE_ADDRESS_1 );
							} }
							className={ address1Error ? 'is-error' : '' }
						/>
						<ControlError error={ address1Error } />

						<TextControl
							label={ __( 'Address line 2 (optional)' ) }
							value={ get( WOOCOMMERCE_STORE_ADDRESS_2 ) }
							onChange={ ( value ) => {
								update( WOOCOMMERCE_STORE_ADDRESS_2, value );
								clearError( WOOCOMMERCE_STORE_ADDRESS_2 );
							} }
							className={ address2Error ? 'is-error' : '' }
						/>
						<ControlError error={ address2Error } />

						<CityZipRow>
							<div>
								<TextControl
									label={ __( 'City' ) }
									value={ get( WOOCOMMERCE_STORE_CITY ) }
									onChange={ ( value ) => {
										update( WOOCOMMERCE_STORE_CITY, value );
										clearError( WOOCOMMERCE_STORE_CITY );
									} }
									className={ cityError ? 'is-error' : '' }
								/>
								<ControlError error={ cityError } />
							</div>

							<div>
								<TextControl
									label={ __( 'Postcode' ) }
									value={ get( WOOCOMMERCE_STORE_POSTCODE ) }
									onChange={ ( value ) => {
										update( WOOCOMMERCE_STORE_POSTCODE, value );
										clearError( WOOCOMMERCE_STORE_POSTCODE );
									} }
									className={ postcodeError ? 'is-error' : '' }
								/>
								<ControlError error={ postcodeError } />
							</div>
						</CityZipRow>

						<ComboboxControl
							label={ __( 'Country / State' ) }
							value={ get( WOOCOMMERCE_DEFAULT_COUNTRY ) }
							onChange={ ( value: string | null ) => {
								update( WOOCOMMERCE_DEFAULT_COUNTRY, value || '' );
								clearError( WOOCOMMERCE_DEFAULT_COUNTRY );
							} }
							options={ countriesAsOptions }
							className={ countryError ? 'is-error' : '' }
						/>
						<ControlError error={ countryError } />

						<TextControl
							label={ __( 'Email address' ) }
							value={ getProfileEmail() }
							onChange={ ( value ) => {
								updateProfileEmail( value );
								clearError( WOOCOMMERCE_ONBOARDING_PROFILE );
							} }
							className={ emailError ? 'is-error' : '' }
						/>
						<ControlError error={ emailError } />

						<ActionSection>
							<SupportCard />
							<StyledNextButton
								type="submit"
								disabled={ Object.values( errors ).filter( Boolean ).length > 0 }
							>
								{ __( 'Continue' ) }
							</StyledNextButton>
						</ActionSection>
					</form>
				</div>
			</>
		);
	};

	const headerText = __( 'Add an address to accept payments' );

	return (
		<div className="signup is-woocommerce-install">
			<div className="signup__steps">
				<div className="signup__step is-store-address">
					<StepContainer
						stepName={ 'store-address' }
						className={ `is-step-${ intent }` }
						skipButtonAlign={ 'top' }
						goBack={ goBack }
						goNext={ goNext }
						isHorizontalLayout={ true }
						formattedHeader={
							<FormattedHeader
								id={ 'site-options-header' }
								headerText={ headerText }
								subHeaderText={ __(
									'This will be used as your default business address. You can change it later if you need to.'
								) }
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

function ControlError( props: { error: string } ): ReactElement | null {
	const { error } = props;
	if ( error ) {
		return <FormInputValidation isError={ true } isValid={ false } text={ error } />;
	}
	return null;
}

export default StoreAddress;
