package com.example.backEnd.Entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "order")
public class Order {
    @Id
    private ObjectId id;

    @DBRef
    private Address deliveryAddress;

    @DBRef
    private User user;

    @DBRef
    private List<CartItem> orderItems;

    private LocalDateTime orderDate;
    private LocalDateTime deliveryDate;

    private PaymentDetails paymentDetails;

    private int discount;
    private int discountedPrice;
    private int totalPrice;
//    -1 cancelled;
//    1 placed;
//    2 shipped;
//    3 delivered;
    private int currentStage;
}