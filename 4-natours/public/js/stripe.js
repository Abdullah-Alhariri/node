/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51IpkfuKpVZUPOvJ7n9TuB4VDWPAeXB8q0Hz9sWcll1yCewKsUZ5zUvSU2mAb7Lkkm0U3ShBwVoyCvvNv4uuWBuhL00z4IcmDsD'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit-card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
