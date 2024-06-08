package com.example.Net_teamproject.controller;

import com.example.Net_teamproject.entity.CustomUserDetails;
import com.example.Net_teamproject.entity.Schedule;
import com.example.Net_teamproject.entity.ScheduleEntry;
import com.example.Net_teamproject.entity.User;
import com.example.Net_teamproject.repository.ScheduleEntryRepository;
import com.example.Net_teamproject.repository.ScheduleRepository;
import com.example.Net_teamproject.service.ScheduleService;
import com.example.Net_teamproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private ScheduleEntryRepository scheduleEntryRepository;
    @Autowired
    private UserService userService;
    @GetMapping("/schedules")
    public List<Schedule> getAllSchedules(){return scheduleRepository.findAll();}
    @GetMapping("/schedules/{id}")
    public Optional<Schedule> getScheduleEntities(@PathVariable Long id) {
        return scheduleRepository.findById(id);
    }
    @GetMapping("/mypage/schedules/{profileId}")
    public List<Schedule> getSchedule(@PathVariable("profileId") Integer profileId) {
        return scheduleRepository.findByProfileId(profileId);
    }
    @PostMapping("/make")
    public Schedule createSchedule(@RequestBody Map<String, Object> payload, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        User user = customUserDetails.getUser();
        String title = (String) payload.get("title");
        List<String> dates = (List<String>) payload.get("dates");
        List<String> times = (List<String>) payload.get("times");
        Map<String, Map<String, String>> scheduleContents = (Map<String, Map<String, String>>) payload.get("scheduleContents");

        Schedule schedule = new Schedule();
        schedule.setTitle(title);

        List<ScheduleEntry> entries = new ArrayList<>();
        for (String date : dates) {
            for (String time : times) {
                ScheduleEntry entry = new ScheduleEntry();
                entry.setSchedule(schedule);
                entry.setDate(date);
                entry.setTime(time);
                entry.setContent(scheduleContents.get(date).get(time));
                entries.add(entry);
            }
        }
        schedule.setEntries(entries);
        schedule.setUser(user);
        return scheduleService.saveSchedule(schedule);
    }
    @DeleteMapping("/schedules/{scheduleId}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long scheduleId) {
        try {
            scheduleService.deleteSchedule(scheduleId);
            return ResponseEntity.ok().build();  // 성공적으로 삭제되었을 경우
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting schedule: " + e.getMessage());
        }
    }
}