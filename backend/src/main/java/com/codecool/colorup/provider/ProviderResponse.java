package com.codecool.colorup.provider;

import com.codecool.colorup.model.Provider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProviderResponse {
    private Provider provider;
    private String image;
}
