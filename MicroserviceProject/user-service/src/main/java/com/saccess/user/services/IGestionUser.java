package com.saccess.user.services;

import com.saccess.user.entities.User;

import java.util.List;

public interface IGestionUser {
    public void createUser(User user);
    public boolean login(String username, String password);
    public User getUserById(long id);
    public boolean resetPassword(long userId,String newPassword);
    public void deleteUser(long userId);
    public boolean modifyUser(long userId, User user);
    public List<User> getAllUsers();
}
