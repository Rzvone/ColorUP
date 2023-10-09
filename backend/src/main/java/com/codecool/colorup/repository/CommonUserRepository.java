package com.codecool.colorup.repository;

import com.codecool.colorup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface CommonUserRepository<T extends User> extends JpaRepository<T,Long> {
    Optional<T> findByUserName(String userName);
}
