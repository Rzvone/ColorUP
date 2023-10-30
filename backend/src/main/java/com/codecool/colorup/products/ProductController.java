package com.codecool.colorup.products;

import com.codecool.colorup.model.Product;
import com.codecool.colorup.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping("/getProducts")
    public ResponseEntity<Page<ProductResponse>> getProducts() {
        Page<Product> productsPage = productService.findAllProductsPageable(PageRequest.of(0, 10));
        Page<ProductResponse> productResponses = productsPage.map(productService::getProductResponse);

        return ResponseEntity.ok().body(productResponses);
    }


}
