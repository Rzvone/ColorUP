package com.codecool.colorup.admin;

import com.codecool.colorup.model.ServiceProvided;
import lombok.Data;

import java.util.List;

@Data
public class MakeProviderRequest {
    private Long userId;
    private List<ServiceProvided> services;
}
