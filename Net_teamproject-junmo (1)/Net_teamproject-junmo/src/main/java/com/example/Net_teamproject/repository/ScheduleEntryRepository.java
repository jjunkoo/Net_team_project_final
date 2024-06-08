package com.example.Net_teamproject.repository;

import com.example.Net_teamproject.entity.ScheduleEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleEntryRepository extends JpaRepository<ScheduleEntry,Long> {
    List<ScheduleEntry> findByScheduleId(Long schedule_id);
    @Query("SELECT s FROM ScheduleEntry s WHERE s.schedule.id = :schedule_id ORDER BY s.date ASC, s.time ASC")
    List<ScheduleEntry> findByScheduleIdOrderByDateAscTimeAsc(@Param("schedule_id")Long schedule_id);
}
