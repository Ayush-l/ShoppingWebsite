package com.example.backEnd.Entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@NoArgsConstructor
@Data
@Document(collection = "review")
public class Review {
    @Id
    private ObjectId id;

    private double rating;
    private String message;
    private User user;
    private Product product;

    private LocalDateTime givenAt;
}
