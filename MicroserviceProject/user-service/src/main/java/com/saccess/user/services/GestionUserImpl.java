package com.saccess.user.services;

import com.saccess.user.clients.AllergyClient;
import com.saccess.user.entities.User;
import com.saccess.user.repositories.UserRepoInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GestionUserImpl implements IGestionUser {
    @Autowired
    UserRepoInterface repo;
    @Autowired
    AllergyClient allergyClient;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createUser(User user) {
        //crypt password
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        //add user
        repo.save(user);
    }

    @Override
    public boolean login(String username, String password) {
        User user = repo.findByEmail(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            // Successful login
            return true;
        }
        return false;
    }

    @Override
    public User getUserById(long id) {
        return repo.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return repo.findByEmail(email);
    }

    @Override
    public boolean resetPassword(long userId, String newPassword) {
        User user = repo.findById(userId).orElse(null);
        if (user != null) {
            String encodedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(encodedPassword);
            repo.save(user);
            return true;
        }
        return false;
    }


    @Override
    public boolean modifyUser(long userId, User user) {
        return false;
    }




    @Override
    public List<User> getAllUsers() {
        return repo.findAll();
    }
    @Override
    public void deleteUser(long usedId){
        if(repo.findById(usedId).isPresent()){
            repo.delete(getUserById(usedId));
            allergyClient.deleteallergybyuserid(usedId);
        }
    }
}
