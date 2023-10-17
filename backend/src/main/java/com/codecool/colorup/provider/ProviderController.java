package com.codecool.colorup.provider;

import com.codecool.colorup.model.Provider;
import com.codecool.colorup.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/providers")
public class ProviderController {
    private final ProviderService providerService;

    @Autowired
    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }
    @GetMapping("/getProviders")
    public List<ProviderResponse> getProviders(){
        return providerService.getProviders();
    }
    @GetMapping("/getProvider/{id}")
    public ProviderResponse getProvider(@PathVariable Long id){
        return providerService.getProvider(id);
    }

}
