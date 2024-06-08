package com.example.Net_teamproject.service;

import com.example.Net_teamproject.entity.Schedule;
import com.example.Net_teamproject.repository.ScheduleRepository;
import com.example.Net_teamproject.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private UserRepository userRepository;
    public Schedule saveSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
    public Optional<Schedule> findByScheduleId(Long id){return scheduleRepository.findById(id);}
    public List<Schedule> findByProfileId(Integer profile_id){return scheduleRepository.findByProfileId(profile_id);}
    @Transactional
    public void deleteSchedule(Long scheduleId) {
        scheduleRepository.deleteById(scheduleId);
    }

}