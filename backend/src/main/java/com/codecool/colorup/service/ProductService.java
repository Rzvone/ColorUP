package com.codecool.colorup.service;

import com.codecool.colorup.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import java.io.IOException;
import java.util.Optional;

public interface ProductService {

    Optional<Product> findById(Long id);
    Page<Product> findAllProductsPageable(Pageable pageable);
    void saveProduct(Product product);
}
