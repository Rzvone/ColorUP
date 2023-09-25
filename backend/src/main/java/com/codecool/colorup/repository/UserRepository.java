package com.codecool.colorup.repository;

import com.codecool.colorup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT u from User u WHERE u.email=?1")
    Optional<User> findUserByEmail(String email);

}
