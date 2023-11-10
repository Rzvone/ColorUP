package com.codecool.colorup.repository;

import com.codecool.colorup.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address,Long> {
}
