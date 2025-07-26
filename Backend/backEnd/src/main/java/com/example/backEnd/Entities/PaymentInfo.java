package com.example.backEnd.Entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Document(collection = "paymentInfo")
@Component
@Data
@NoArgsConstructor
public class PaymentInfo {
    @Id
    private ObjectId id;

    private String cvv;
    private String cardNumber;
    private String cardHolderName;
    private String expirationDate;

    private User user;
}
