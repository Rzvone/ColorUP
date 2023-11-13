package com.codecool.colorup.controller;

import com.codecool.colorup.DTOS.PaymentConfirmationData;
import com.codecool.colorup.DTOS.PaymentData;
import com.codecool.colorup.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentConfirmParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @CrossOrigin("*")
    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentData paymentData) {
        try {
            // Create a PaymentIntent on Stripe
            PaymentIntentCreateParams createParams = stripeService.createPaymentIntent(paymentData.getAmount(), paymentData.getCurrency());
            PaymentIntent paymentIntent = PaymentIntent.create(createParams);
            Map<String, String> responseData = new HashMap<>();
            responseData.put("clientSecret", paymentIntent.getClientSecret());
            responseData.put("paymentIntentId", paymentIntent.getId());

            // Return the client secret and paymentIntentId of the created PaymentIntent
            return ResponseEntity.ok(responseData);
        } catch (StripeException e) {
            // Handle Stripe API exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{ \"error\": \"Failed to create PaymentIntent\" }");
        }
    }


    @CrossOrigin("*")
    @PostMapping("/confirm-payment")
    public ResponseEntity<String> confirmPayment(@RequestBody PaymentConfirmationData confirmationData) {
        try {
            // Retrieve the PaymentIntent
            PaymentIntent paymentIntent = PaymentIntent.retrieve(confirmationData.getPaymentIntentId());

            // Create a map to hold confirmation parameters
            Map<String, Object> params = new HashMap<>();
            params.put("payment_method", confirmationData.getPaymentMethodId());

            // Confirm the PaymentIntent with the provided payment method
            PaymentIntent confirmedPaymentIntent = paymentIntent.confirm(params);

            // Check the status of the confirmed PaymentIntent
            if ("succeeded".equals(confirmedPaymentIntent.getStatus())) {
                // Payment succeeded
                return ResponseEntity.ok("{ \"status\": \"success\" }");
            } else {
                // Payment failed
                return ResponseEntity.ok("{ \"status\": \"failed\", \"error\": \"Payment failed\" }");
            }
        } catch (StripeException e) {
            // Handle Stripe API exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{ \"error\": \"Failed to confirm PaymentIntent\" }");
        }
    }


}


