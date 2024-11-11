package com.saccess.user.repositories;

import com.saccess.user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepoInterface extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
