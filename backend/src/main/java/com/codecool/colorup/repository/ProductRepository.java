package com.codecool.colorup.repository;

import com.codecool.colorup.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    public Optional<Product> findById(Long id);


}
