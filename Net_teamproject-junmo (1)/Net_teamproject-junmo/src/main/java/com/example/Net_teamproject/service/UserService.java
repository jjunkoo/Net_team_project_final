package com.example.Net_teamproject.service;

import com.example.Net_teamproject.entity.User;
import com.example.Net_teamproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String name, String id, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setName(name);
        user.setId(id);
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public Optional<User> findById(String id) {  // Optional<User>로 반환
        return userRepository.findById(id);
    }

    public User loginUser(String id, String password) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }
}
