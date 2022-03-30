import { StepContainer } from '@automattic/onboarding';
import styled from '@emotion/styled';
import { ComboboxControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useI18n } from '@wordpress/react-i18n';
import { FormEvent, ReactElement, useState } from 'react';
import FormattedHeader from 'calypso/components/formatted-header';
import FormFieldset from 'calypso/components/forms/form-fieldset';
import FormInputValidation from 'calypso/components/forms/form-input-validation';
import FormLabel from 'calypso/components/forms/form-label';
import FormInput from 'calypso/components/forms/form-text-input';
import { useSite } from 'calypso/landing/stepper/hooks/use-site';
import { ONBOARD_STORE } from 'calypso/landing/stepper/stores';
import { recordTracksEvent } from 'calypso/lib/analytics/tracks';
import { ActionSection, StyledNextButton } from 'calypso/signup/steps/woocommerce-install';
import type { Step } from '../../types';
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
	const intent = useSelect( ( select ) => select( ONBOARD_STORE ).getIntent() );
	const storeAddress = useSelect( ( select ) => select( ONBOARD_STORE ).getStoreAddress() );
	const site = useSite();
	const { __ } = useI18n();
	const [ storeAddress1, setStoreAddress1 ] = useState( storeAddress.store_address_1 );
	const [ storeAddress2, setStoreAddress2 ] = useState( storeAddress.store_address_2 );
	const [ storeCity, setStoreCity ] = useState( storeAddress.store_city );
	const [ storePostcode, setStorePostcode ] = useState( storeAddress.store_postcode );
	const [ storeCountry, setStoreCountry ] = useState( storeAddress.store_country );

	const { setStoreAddressValue } = useDispatch( ONBOARD_STORE );

	const onChange = ( event: React.FormEvent< HTMLInputElement > ) => {
		if ( site ) {
			switch ( event.currentTarget.name ) {
				case 'store_address_1':
					setStoreAddress1( event.currentTarget.value );
					break;
				case 'store_address_2':
					setStoreAddress2( event.currentTarget.value );
					break;
				case 'store_city':
					setStoreCity( event.currentTarget.value );
					break;
				case 'store_postcode':
					setStorePostcode( event.currentTarget.value );
					break;
				case 'store_country':
					setStoreCountry( event.currentTarget.value );
					break;
			}
		}
	};

	const onSubmit = async ( event: FormEvent ) => {
		event.preventDefault();

		if ( site ) {
			await setStoreAddressValue( 'store_address_1', storeAddress1 );
			await setStoreAddressValue( 'store_address_2', storeAddress2 || '' );
			await setStoreAddressValue( 'store_city', storeCity );
			await setStoreAddressValue( 'store_postcode', storePostcode );
			await setStoreAddressValue( 'store_country', storeCountry );

			submit?.( {
				storeAddress1,
				storeAddress2,
				storeCity,
				storePostcode,
				storeCountry,
			} );
		}
	};

	/*************************************************************************************************/
	// TODO - Dummy values
	const profileEmail = '';
	const getProfileEmail = () => {
		return '';
	};
	const updateProfileEmail = ( value: any ) => {
		return;
	};
	const errors = {};
	const getError = ( field: string ) => {
		return '';
	};
	const SupportCard = () => {
		return null;
	};
	/*************************************************************************************************/

	const address1Error = getError( 'store_address_1' );
	const address2Error = getError( 'store_address_2' );
	const cityError = getError( 'store_city' );
	const countryError = getError( 'store_country' );
	const postcodeError = getError( 'store_postcode' );
	const emailError = getError( 'profile_email' );

	const getContent = () => {
		return (
			<>
				<form onSubmit={ onSubmit }>
					<FormFieldset>
						<FormLabel htmlFor="store_address_1">{ __( 'Address line 1' ) }</FormLabel>
						<FormInput
							value={ storeAddress1 }
							name="store_address_1"
							id="store_address_1"
							onChange={ onChange }
							className={ address1Error ? 'is-error' : '' }
						/>
						<ControlError error={ address1Error } />
					</FormFieldset>

					<FormFieldset>
						<FormLabel htmlFor="store_address_1">{ __( 'Address line 2 (optional)' ) }</FormLabel>
						<FormInput
							value={ storeAddress2 }
							name="store_address_2"
							id="store_address_2"
							onChange={ onChange }
							className={ address2Error ? 'is-error' : '' }
						/>
						<ControlError error={ address2Error } />
					</FormFieldset>

					<CityZipRow>
						<div>
							<FormFieldset>
								<FormLabel htmlFor="store_address_1">{ __( 'City' ) }</FormLabel>
								<FormInput
									value={ storeCity }
									name="store_city"
									id="store_city"
									onChange={ onChange }
									className={ cityError ? 'is-error' : '' }
								/>
								<ControlError error={ cityError } />
							</FormFieldset>
						</div>

						<div>
							<FormFieldset>
								<FormLabel htmlFor="store_address_1">{ __( 'Postcode' ) }</FormLabel>
								<FormInput
									value={ storePostcode }
									name="store_postcode"
									id="store_postcode"
									onChange={ onChange }
									className={ postcodeError ? 'is-error' : '' }
								/>
								<ControlError error={ postcodeError } />
							</FormFieldset>
						</div>
					</CityZipRow>

					<FormFieldset>
						<FormLabel htmlFor="store_address_1">{ __( 'Country / State' ) }</FormLabel>
						<ComboboxControl
							value={ storeCountry }
							name="store_country"
							id="store_country"
							onChange={ onChange }
							options={ [] }
							className={ countryError ? 'is-error' : '' }
						/>
						<ControlError error={ countryError } />
					</FormFieldset>

					<FormFieldset>
						<FormLabel htmlFor="store_address_1">{ __( 'Email address' ) }</FormLabel>
						<FormInput
							value={ getProfileEmail() }
							name={ profileEmail }
							id={ profileEmail }
							onChange={ onChange /* TODO - change profile email? */ }
							className={ emailError ? 'is-error' : '' }
						/>
						<ControlError error={ emailError } />
					</FormFieldset>

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
