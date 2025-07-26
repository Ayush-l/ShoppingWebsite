package com.example.backEnd.Entities;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@Data
@NoArgsConstructor
@Document(collection = "product")
public class Product {
    @Id
    private Integer id;

    private String title;
    private String description;
    private int discountedPrice;
    private int price;
    private String color;
    private ArrayList<Integer> quantity=new ArrayList<>();
    private String brand;
    private String imageUrl;
    private String topLevelCategory;
    private String secondLevelCategory;
    private String thirdLevelCategory;
    private int discountPer;

    private ArrayList<Integer> ratings=new ArrayList<>();


    @DBRef
    private User seller;
    @DBRef
    private ArrayList<Review> reviews=new ArrayList<>();
    private ArrayList<Boolean> sizes=new ArrayList<>();


    public void addReview(Review review){ reviews.add(review);}
}
