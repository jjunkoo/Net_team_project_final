package com.example.Net_teamproject.controller;

import com.example.Net_teamproject.entity.CustomUserDetails;
import com.example.Net_teamproject.entity.User;
import com.example.Net_teamproject.service.CustomUserDetailsService;
import com.example.Net_teamproject.service.ReviewService;
import com.example.Net_teamproject.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.Net_teamproject.entity.Review;
import com.example.Net_teamproject.repository.ReviewRepository;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
public class ReviewController {
    @Autowired
    private UserService userService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/review")
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @GetMapping("/review/{id}")
    public Optional<Review> getReviewById(@PathVariable("id") Integer id) {
        return reviewRepository.findById(id);
    }

    @GetMapping("/search/{tag}")
    public List<Review> getReviewByTag(@PathVariable("tag") String tag) {
        return reviewRepository.findByTag(tag);
    }

    @GetMapping("/mypage/reviews/{profileId}")
    public List<Review> getReviewsByProfile(@PathVariable("profileId") Integer profileId) {
        return reviewService.findByProfileId(profileId);
    }

    @PostMapping("/writereview")
    public Review addReviewToProfile(@RequestBody Review review, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        User user = customUserDetails.getUser();
        review.setUser(user);
        review = reviewService.save(review);
        return review;
    }
    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Integer reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return ResponseEntity.ok().build();  // 성공적으로 삭제되었을 경우
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting review: " + e.getMessage());
        }
    }
}