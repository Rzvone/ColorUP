package com.codecool.colorup.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentConfirmationData {
    private String clientSecret;
    private String paymentMethodId;
    private String paymentIntentId;

    // Constructors, getters, and setters
}
