package com.example.Net_teamproject.entity;

import jakarta.persistence.*;


import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer profileId;  // 기본 키

    @Column(nullable = false)
    private String name; // 닉네임

    @Column(nullable = false, unique = true)
    private String id; // 아이디

    @Column(nullable = false)
    private String password; // 비밀번호

    // Getters and Setters
    public Integer getProfileId() { return profileId; }

    public void setProfileId(Integer profileId) { this.profileId = profileId; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

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
