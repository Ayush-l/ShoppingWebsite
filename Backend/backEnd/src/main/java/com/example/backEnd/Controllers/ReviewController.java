package com.example.backEnd.Controllers;

import com.example.backEnd.Entities.Review;
import com.example.backEnd.Services.ReviewService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/{review}/{productId}")
    public ResponseEntity<Boolean> createReview(@PathVariable Review review, @PathVariable Integer productId){
        if(reviewService.createReview(review, SecurityContextHolder.getContext().getAuthentication().getName(),productId)){
            return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
    }
}
