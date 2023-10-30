package com.codecool.colorup.repository;

import com.codecool.colorup.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Cart getCartByUserId(Long id);
}
