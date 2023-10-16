package com.codecool.colorup.provider;

import com.codecool.colorup.model.Provider;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderResponse {
    private Provider provider;
    private String image;
}
