package com.seven.hayoma.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seven.hayoma.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByIdAndUsernameAndRole(Long id, String username, User.Role role);


}