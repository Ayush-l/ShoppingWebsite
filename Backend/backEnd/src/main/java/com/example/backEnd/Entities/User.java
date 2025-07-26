package com.example.backEnd.Entities;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Component
@Data
@NoArgsConstructor
@Document(collection = "user")
public class User {
    @Id
    private String email;

    private String passWord;

    private String firstName;
    private String lastName;

    private String role;

    @DBRef
    private List<Address> addresses=new ArrayList<>();

    @DBRef
    private List<PaymentInfo> paymentInfos=new ArrayList<>();

    @DBRef
    private List<Review> reviews=new ArrayList<>();

    @DBRef
    private List<Order> orders=new ArrayList<>();

    @DBRef
    private Cart cart;

    private LocalDateTime createdAt;

    public void addAddress(Address newAddress){
        addresses.add(newAddress);
    }

    public void addPaymentInfos(PaymentInfo paymentInfo){
        paymentInfos.add(paymentInfo);
    }

    public void addReview(Review review){
        reviews.add(review);
    }

    public void addOrder(Order order){
        orders.add(order);
    }
}