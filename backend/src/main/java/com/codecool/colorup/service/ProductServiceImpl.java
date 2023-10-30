package com.codecool.colorup.service;

import com.codecool.colorup.model.Product;
import com.codecool.colorup.products.ProductResponse;
import com.codecool.colorup.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Optional;

@Service(value = "productService")
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/backend/src/main/resources/images";

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Page<Product> findAllProductsPageable(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public ProductResponse getProductResponse(Product product) {
        return new ProductResponse(product,imageToDataUrl(loadImageForProduct(product)));
    }

    @Override
    public byte[] loadImageForProduct(Product product) {
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

    @Override
    public String imageToDataUrl(byte[] image) {
        String base64Image = Base64.getEncoder().encodeToString(image);
        return "data:image/jpeg;base64," + base64Image;
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }



}
