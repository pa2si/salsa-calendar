import { useCallback, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CreateAndEditEventType } from '@/types/types';

declare global {
  interface Window {
    google: typeof google;
    initAutocompleteCity: () => void;
    initAutocompleteLocation: () => void;
    initAutocompleteStreet: () => void;
    initAutocompletePostal: () => void;
    initAutocompleteCountry: () => void;
  }
}

const useGoogleAutocomplete = (form: UseFormReturn<CreateAndEditEventType>) => {
  const [locationName, setLocationName] = useState('');

  const initializeAutocomplete = useCallback(() => {
    const preventEnterKeySubmission = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    };

    const initAutocomplete = (id: string, types: string[]) => {
      const input = document.getElementById(id) as HTMLInputElement;
      if (!input) return;

      input.addEventListener('keydown', preventEnterKeySubmission);

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types,
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const addressComponents = place.address_components;

        if (addressComponents) {
          const locationData: Partial<CreateAndEditEventType> = {};

          let streetName = '';
          let streetNumber = '';

          addressComponents.forEach((component) => {
            const types = component.types;
            if (types.includes('locality')) {
              locationData.city = component.long_name;
            }
            if (types.includes('country')) {
              locationData.country = component.long_name;
            }
            if (types.includes('street_number')) {
              streetNumber = component.long_name;
            }
            if (types.includes('route')) {
              streetName = component.long_name;
            }
            if (types.includes('postal_code')) {
              locationData.postal = component.long_name;
            }
          });

          // Combine street name and number in the desired order
          if (streetName || streetNumber) {
            locationData.street = `${streetName} ${streetNumber}`.trim();
          }

          // Set form values
          Object.keys(locationData).forEach((key) => {
            form.setValue(
              key as keyof CreateAndEditEventType,
              locationData[key as keyof typeof locationData] as any
            );
          });

          // Update state with the selected place's name
          if (id === 'locationName') {
            const placeName = place.name || '';
            setLocationName(placeName);
            form.setValue('locationName', placeName); // Sync form value with the state
            if (place.url) {
              form.setValue('mapsLink', place.url);
            }
          }
        } else {
          console.error(
            'No address components available for the selected place.'
          );
        }
      });
    };

    initAutocomplete('city', ['(cities)']);
    initAutocomplete('locationName', ['establishment']);
    initAutocomplete('street', ['address']);
    initAutocomplete('postal', ['postal_code']);
    initAutocomplete('country', ['(regions)']);
  }, [form]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (typeof window.google === 'object' && window.google.maps) {
        (window as any).googleMapsReady = true;
        initializeAutocomplete();
        return;
      }

      if (!document.querySelector('#google-maps-script')) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=googleMapsLoaded&loading=async`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          console.error('Failed to load Google Maps script.');
        };
        document.head.appendChild(script);

        (window as any).googleMapsLoaded = () => {
          (window as any).googleMapsReady = true;
          initializeAutocomplete();
        };

        window.initAutocompleteCity = initializeAutocomplete;
        window.initAutocompleteLocation = initializeAutocomplete;
        window.initAutocompleteStreet = initializeAutocomplete;
        window.initAutocompletePostal = initializeAutocomplete;
        window.initAutocompleteCountry = initializeAutocomplete;
      } else {
        window.initAutocompleteCity = initializeAutocomplete;
        window.initAutocompleteLocation = initializeAutocomplete;
        window.initAutocompleteStreet = initializeAutocomplete;
        window.initAutocompletePostal = initializeAutocomplete;
        window.initAutocompleteCountry = initializeAutocomplete;

        if ((window as any).googleMapsReady) {
          initializeAutocomplete();
        }
      }
    };

    loadGoogleMapsScript();

    return () => {
      const inputs = document.querySelectorAll(
        '#city, #locationName, #street, #postal, #country'
      ) as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        input.removeEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        });
      });
    };
  }, [initializeAutocomplete]);

  return { locationName, setLocationName };
};

export default useGoogleAutocomplete;
