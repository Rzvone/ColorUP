package com.codecool.colorup.config;

import com.stripe.Stripe;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class StripeConfig {

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    public StripeConfig() {
        // Set the Stripe API key during initialization
        Stripe.apiKey = stripeSecretKey;
    }
}

