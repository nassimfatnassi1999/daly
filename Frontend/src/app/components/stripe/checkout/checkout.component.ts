import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  // We load  Stripe
  stripePromise = loadStripe('pk_test_51PCiVZFYK7t6OJjf8bJm9EBdX6mYk3VdcT8YLpwbU103XimlNuWSmO7t9iZVXUY4g58iYXgV0FTODDxoF9O9ipaG00g2cwTjcO');
  constructor(private http: HttpClient) { }

  async pay(): Promise<void> {
    // here we create a payment object
    const payment = {
      name: 'Iphone',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: 99900,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
   
    if (stripe !== null) { // Check if stripe is not null
      // this is a normal http calls for a backend api
      this.http
        .post(`${environment.serverUrl}/payment`, payment)
        .subscribe((data: any) => {
          // I use stripe to redirect To Checkout page of Stripe platform
          stripe.redirectToCheckout({
            sessionId: data.id,
          });
        });
    } else {
      console.error('Stripe is null.');
    }
  }
}
