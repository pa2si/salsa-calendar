'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FormMessage } from '@/components/ui/form';
import { createAndEditEventSchema } from '@/schemas/schemas';
import { EventGenre, CreateAndEditEventType } from '@/types/types';
import { CustomFormField } from './FormComponents';
import Genrepicker from './Genrepicker';
import { DatePicker } from './Datepicker';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEventAction } from '@/actions/dbActions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { TimePicker } from './Timepicker';
import { FormLabel } from '@/components/ui/form';
import UploadFile from './UploadFile';
import { useEdgeStore } from '@/lib/providers';
import { EventType } from '@/types/types';

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

const CreateEventForm = () => {
  const { edgestore } = useEdgeStore();

  // 1. Define your form.
  const form = useForm<CreateAndEditEventType>({
    resolver: zodResolver(createAndEditEventSchema),
    defaultValues: {
      id: '',
      eventName: '',
      date: new Date(),
      time: '',
      locationName: '',
      street: '',
      city: '',
      postal: '',
      country: '',
      checkedGenres: [],
      imageUrl: '',
    },
  });

  useEffect(() => {
    const preventEnterKeySubmission = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    };

    const initAutocompleteCity = () => {
      const input = document.getElementById('city') as HTMLInputElement;
      if (!input) return;

      input.addEventListener('keydown', preventEnterKeySubmission);

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['(cities)'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const addressComponents = place.address_components;

        if (addressComponents) {
          const locationData: Partial<Pick<EventType, 'city' | 'country'>> = {
            city: '',
            country: '',
          };

          addressComponents.forEach((component) => {
            const types = component.types;
            if (types.includes('locality')) {
              locationData.city = component.long_name;
            }
            if (types.includes('country')) {
              locationData.country = component.long_name;
            }
          });

          // Set form values
          Object.keys(locationData).forEach((key) => {
            form.setValue(
              key as keyof CreateAndEditEventType,
              locationData[key as keyof typeof locationData] as any
            );
          });
        } else {
          console.error(
            'No address components available for the selected place.'
          );
        }
      });
    };

    const initAutocompleteLocation = () => {
      const input = document.getElementById('locationName') as HTMLInputElement;
      if (!input) return;

      input.addEventListener('keydown', preventEnterKeySubmission);

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['establishment'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const addressComponents = place.address_components;

        if (addressComponents) {
          const locationData: Partial<
            Pick<
              EventType,
              'locationName' | 'street' | 'city' | 'postal' | 'country'
            >
          > = {
            locationName: place.name || '',
            street: '',
            city: '',
            postal: '',
            country: '',
          };

          addressComponents.forEach((component) => {
            const types = component.types;
            if (types.includes('street_number')) {
              locationData.street += ` ${component.long_name}`;
            }
            if (types.includes('route')) {
              locationData.street = `${component.long_name}${locationData.street}`;
            }
            if (types.includes('locality')) {
              locationData.city = component.long_name;
            }
            if (types.includes('postal_code')) {
              locationData.postal = component.long_name;
            }
            if (types.includes('country')) {
              locationData.country = component.long_name;
            }
          });

          // Set form values
          Object.keys(locationData).forEach((key) => {
            form.setValue(
              key as keyof CreateAndEditEventType,
              locationData[key as keyof typeof locationData] as any
            );
          });
        } else {
          console.error(
            'No address components available for the selected place.'
          );
        }
      });
    };

    const initAutocompleteStreet = () => {
      const input = document.getElementById('street') as HTMLInputElement;
      if (!input) return;

      input.addEventListener('keydown', preventEnterKeySubmission);

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const addressComponents = place.address_components;

        if (addressComponents) {
          const locationData: Partial<
            Pick<EventType, 'street' | 'city' | 'country'>
          > = {
            street: '',
            city: '',
            country: '',
          };

          addressComponents.forEach((component) => {
            const types = component.types;
            if (types.includes('street_number')) {
              locationData.street += ` ${component.long_name}`;
            }
            if (types.includes('route')) {
              locationData.street = `${component.long_name}${locationData.street}`;
            }
            if (types.includes('locality')) {
              locationData.city = component.long_name;
            }
            if (types.includes('country')) {
              locationData.country = component.long_name;
            }
          });

          // Set form values
          Object.keys(locationData).forEach((key) => {
            form.setValue(
              key as keyof CreateAndEditEventType,
              locationData[key as keyof typeof locationData] as any
            );
          });
        } else {
          console.error(
            'No address components available for the selected place.'
          );
        }
      });
    };

    const initAutocompletePostal = () => {
      const input = document.getElementById('postal') as HTMLInputElement;
      if (!input) return;

      input.addEventListener('keydown', preventEnterKeySubmission);

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['postal_code'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const addressComponents = place.address_components;

        if (addressComponents) {
          const locationData: Partial<
            Pick<EventType, 'postal' | 'city' | 'country'>
          > = {
            postal: '',
            city: '',
            country: '',
          };

          addressComponents.forEach((component) => {
            const types = component.types;
            if (types.includes('postal_code')) {
              locationData.postal = component.long_name;
            }
            if (types.includes('locality')) {
              locationData.city = component.long_name;
            }
            if (types.includes('country')) {
              locationData.country = component.long_name;
            }
          });

          // Set form values
          Object.keys(locationData).forEach((key) => {
            form.setValue(
              key as keyof CreateAndEditEventType,
              locationData[key as keyof typeof locationData] as any
            );
          });
        } else {
          console.error(
            'No address components available for the selected place.'
          );
        }
      });
    };

    const initAutocompleteCountry = () => {
      const input = document.getElementById('country') as HTMLInputElement;
      if (!input) return;

      input.addEventListener('keydown', preventEnterKeySubmission);

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['(regions)'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const addressComponents = place.address_components;

        if (addressComponents) {
          const locationData: Partial<Pick<EventType, 'country'>> = {
            country: '',
          };

          addressComponents.forEach((component) => {
            const types = component.types;
            if (types.includes('country')) {
              locationData.country = component.long_name;
            }
          });

          // Set form values
          form.setValue('country', locationData.country as any);
        } else {
          console.error(
            'No address components available for the selected place.'
          );
        }
      });
    };

    const loadGoogleMapsScript = () => {
      if (typeof window.google === 'object' && window.google.maps) {
        (window as any).googleMapsReady = true;
        window.initAutocompleteCity();
        window.initAutocompleteLocation();
        window.initAutocompleteStreet();
        window.initAutocompletePostal();
        window.initAutocompleteCountry();
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
          window.initAutocompleteCity();
          window.initAutocompleteLocation();
          window.initAutocompleteStreet();
          window.initAutocompletePostal();
          window.initAutocompleteCountry();
        };

        window.initAutocompleteCity = initAutocompleteCity;
        window.initAutocompleteLocation = initAutocompleteLocation;
        window.initAutocompleteStreet = initAutocompleteStreet;
        window.initAutocompletePostal = initAutocompletePostal;
        window.initAutocompleteCountry = initAutocompleteCountry;
      } else {
        window.initAutocompleteCity = initAutocompleteCity;
        window.initAutocompleteLocation = initAutocompleteLocation;
        window.initAutocompleteStreet = initAutocompleteStreet;
        window.initAutocompletePostal = initAutocompletePostal;
        window.initAutocompleteCountry = initAutocompleteCountry;

        if ((window as any).googleMapsReady) {
          window.initAutocompleteCity();
          window.initAutocompleteLocation();
          window.initAutocompleteStreet();
          window.initAutocompletePostal();
          window.initAutocompleteCountry();
        }
      }
    };

    loadGoogleMapsScript();

    // Cleanup function to remove event listeners
    return () => {
      const inputs = document.querySelectorAll(
        '#city, #locationName, #street, #postal, #country'
      ) as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        input.removeEventListener('keydown', preventEnterKeySubmission);
      });
    };
  }, [form]);

  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CreateAndEditEventType) => {
      // Try to confirm the image upload if imageUrl is present
      if (values.imageUrl) {
        try {
          await edgestore.publicImages.confirmUpload({
            url: values.imageUrl,
          });
        } catch (error) {
          console.error('Failed to confirm image upload:', error);
          throw new Error('Failed to confirm image upload. Please try again.');
        }
      }

      // Proceed to create the event with all collected values
      return createEventAction(values);
    },
    onSuccess: (data) => {
      if (!data) {
        toast.error('There was an error processing your request.');
        return;
      }
      toast.success('Event added successfully');
      queryClient.invalidateQueries({ queryKey: ['events'] });

      // form.reset()
      router.push('/');
    },
    onError: (error) => {
      // Handle errors more specifically if you can
      toast.error(`Error: ${error.message}`);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditEventType) {
    // console.log(values);
    mutate(values);
  }

  const genreOptions = Object.keys(EventGenre) as (keyof typeof EventGenre)[];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add Event</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols3 items-start">
          {/*  Event Name */}
          <CustomFormField
            name="eventName"
            control={form.control}
            labelText="Event Name"
          />
          <div className="flex flex-row w-full sm:w-64 md:w-80 lg:w-72 xl:w-80">
            {/* Date */}
            <div className="grow">
              <DatePicker name="date" />
            </div>
            <div>
              <TimePicker name="time" />
            </div>
            {/* Time */}
          </div>

          {/*  Location Name */}
          <CustomFormField
            name="locationName"
            control={form.control}
            labelText="Location Name"
            placeholder="Find your location"
          />
          {/*  Street */}
          <CustomFormField
            name="street"
            labelText="Street and Number"
            control={form.control}
            placeholder="Enter a Street"
          />
          {/* City */}
          <CustomFormField
            name="city"
            control={form.control}
            placeholder="Enter a City"
          />
          {/*  Postal*/}
          <CustomFormField
            name="postal"
            control={form.control}
            labelText="postal code"
            placeholder="Enter a Postal Code"
          />
          {/* Country */}
          <CustomFormField
            name="country"
            control={form.control}
            placeholder="Enter a Country"
          />
          <div className="flex flex-col mt-2 gap-2">
            {/* Genres */}
            <FormLabel className="mb-2">Genre</FormLabel>
            <Genrepicker genres={genreOptions} />
          </div>
          {/* Image Upload */}
          <div className="flex flex-col mt-2 gap-2">
            <FormLabel className="mb-2">Upload Flyer</FormLabel>
            <div className="w-full sm:w-64 md:w-80 lg:w-72 xl:w-80 max-w-xs flex justify-center">
              <UploadFile
                onUrlChange={(url) => form.setValue('imageUrl', url)} // Store the URL in the form state
              />
            </div>
          </div>
        </div>

        <FormMessage />
        <Button
          type="submit"
          className="capitalize bg-blue-500 hover:bg-blue-700 w-full"
          disabled={isPending}
        >
          {isPending ? 'loading' : 'add Event'}
        </Button>
      </form>
    </Form>
  );
};
export default CreateEventForm;
