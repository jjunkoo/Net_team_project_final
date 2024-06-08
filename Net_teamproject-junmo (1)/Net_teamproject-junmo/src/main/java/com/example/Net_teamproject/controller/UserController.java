package com.example.Net_teamproject.controller;

import com.example.Net_teamproject.dto.UserDto;
import com.example.Net_teamproject.entity.CustomUserDetails;
import com.example.Net_teamproject.entity.User;
import com.example.Net_teamproject.repository.UserRepository;
import com.example.Net_teamproject.service.CustomUserDetailsService;
import com.example.Net_teamproject.service.UserService;
import com.example.Net_teamproject.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserService userService;
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getId(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails.getUsername()); // 로그인한 id로 JWT 토큰 생성
            System.out.println(token);
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto userDto) {
        customUserDetailsService.save(userDto);
        return ResponseEntity.ok("Signup successful");
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            System.out.println(token);
            token = token.substring(7); // "Bearer " 제거
        }
        if (jwtUtil.validateToken(token)) {
            String id = jwtUtil.getIdFromToken(token); // 토큰에서 사용자 ID 추출
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(id);
            System.out.println(userDetails.getUsername());
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
}
class LoginRequest {
    private String id;
    private String password;

    // getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

class JwtResponse {
    private String token;

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
