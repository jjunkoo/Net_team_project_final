package com.example.Net_teamproject.service;

import com.example.Net_teamproject.entity.Review;
import com.example.Net_teamproject.entity.User;
import com.example.Net_teamproject.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    public List<Review> findByProfileId(Integer profile_id) {
        return reviewRepository.findByUserId(profile_id);
    }

    public Review save(Review review) {
        return reviewRepository.save(review);
    }
    @Transactional
    public void deleteReview(Integer reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
