/*
package com.example.Net_teamproject.entity;

import jakarta.persistence.*;
import java.util.Map;

@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;
    private String scheduleTitle;

    private Integer profileId;

    @ElementCollection
    @CollectionTable(name = "schedule_contents", joinColumns = @JoinColumn(name = "schedule_id"))
    @MapKeyColumn(name = "time_slot")
    @Column(name = "content")
    private Map<String, String> scheduleContents;

    // Getters and setters
    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getScheduleTitle() {
        return scheduleTitle;
    }

    public void setScheduleTitle(String scheduleTitle) {
        this.scheduleTitle = scheduleTitle;
    }

    public Integer getProfileId() {
        return profileId;
    }

    public void setProfileId(Integer profileId) {
        this.profileId = profileId;
    }

    public Map<String, String> getScheduleContents() {
        return scheduleContents;
    }

    public void setScheduleContents(Map<String, String> scheduleContents) {
        this.scheduleContents = scheduleContents;
    }
}
*/
package com.example.Net_teamproject.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Setter
    private String title;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "schedule")
    private List<ScheduleEntry> entries;

    @ManyToOne
    @JoinColumn(name = "profileId")
    private User user;
    public void setUser(User user){this.user = user;}
}

