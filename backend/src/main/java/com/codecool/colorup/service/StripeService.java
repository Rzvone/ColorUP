package com.codecool.colorup.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentConfirmParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    private final String stripeSecretKey;

    public StripeService(@Value("${stripe.secret-key}") String stripeSecretKey) {
        this.stripeSecretKey = stripeSecretKey;
        // Set the Stripe API key during construction
        Stripe.apiKey = stripeSecretKey;
    }

    // Inside your createPaymentIntent method in StripeService
    public PaymentIntentCreateParams createPaymentIntent(long amount, String currency) {
        try {
            // Set your secret key
            Stripe.apiKey = stripeSecretKey;

            // Create a PaymentIntent on Stripe
            return PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency(currency)
                    .setAutomaticPaymentMethods(PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).setAllowRedirects(PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.NEVER).build())
                    .build();

        } catch (Exception e) {
            // Handle exceptions appropriately
            e.printStackTrace();
            return null;
        }
    }


    public PaymentIntentConfirmParams confirmPaymentIntent(String clientSecret, String paymentMethodId) {
        return PaymentIntentConfirmParams.builder()
                .setPaymentMethod(paymentMethodId)
                .build();
    }
}

