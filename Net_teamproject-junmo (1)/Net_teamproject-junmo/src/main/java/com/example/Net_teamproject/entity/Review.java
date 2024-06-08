package com.example.Net_teamproject.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
//@Table(name = "후기")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer review_id;
    @Setter
    private String place;
    @Setter
    private String tag;
    @Setter
    private String content;
    @Setter
    private String review_img;
    @ManyToOne
    @JoinColumn(name = "profileId")
    private User user;
    public void setUser(User user){this.user = user;}
    public Integer getReview_id(){
        return review_id;
    }
    public void setReview_id(Integer review_id){
        this.review_id = review_id;
    }
    public String getPlace(){
        return place;
    }
    public String getTag(){
        return tag;
    }
    public String getReview_img(){
        return review_img;
    }
    public String getContent(){
        return content;
    }
}

