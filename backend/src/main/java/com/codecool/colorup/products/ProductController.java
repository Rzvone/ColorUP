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
    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/backend/src/main/resources/images";
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping("/getProducts")
    public ResponseEntity<Page<ProductResponse>> getProducts() {
        Page<Product> productsPage = productService.findAllProductsPageable(PageRequest.of(0, 10));
        Page<ProductResponse> productResponses = productsPage.map(product -> {
            // Load the image associated with the product
            byte[] image = loadImageForProduct(product);

            // Create a ProductResponse object with the Product and image
            return new ProductResponse(product, imageToDataUrl(image));
        });

        return ResponseEntity.ok().body(productResponses);
    }

    private byte[] loadImageForProduct(Product product) {
        // Construct the image file path based on the product's ID
        String imageFileName = product.getId() + ".jpg";

        // Combine the image directory and the image file name to get the full path
        Path imagePath = Paths.get(UPLOAD_DIRECTORY, imageFileName);

        try {
            // Read the image file into a byte array
            return Files.readAllBytes(imagePath);
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception as needed
            return new byte[0];  // Return an empty byte array on error
        }
    }

    private String imageToDataUrl(byte[] image) {
        String base64Image = Base64.getEncoder().encodeToString(image);
        return "data:image/jpeg;base64," + base64Image;
    }
}
