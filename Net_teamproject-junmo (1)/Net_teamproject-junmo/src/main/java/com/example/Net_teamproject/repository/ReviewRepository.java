package com.example.Net_teamproject.repository;

import com.example.Net_teamproject.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Integer> {
    //    List<Review> findByReviewId(Integer review_id);
    List<Review> findByTag(String tag);
    @Query("SELECT r FROM Review r WHERE r.user.profileId = :profileId")
    List<Review> findByUserId(@Param("profileId") Integer profileId);
}
