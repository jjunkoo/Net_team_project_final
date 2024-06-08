package com.example.Net_teamproject.repository;


import com.example.Net_teamproject.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<Schedule> findById(Long id);
    @Query("SELECT r FROM Schedule r WHERE r.user.profileId = :profileId")
    List<Schedule> findByProfileId(@Param("profileId")Integer id);
}
