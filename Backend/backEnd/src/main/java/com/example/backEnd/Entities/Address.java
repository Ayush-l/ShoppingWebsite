package com.example.backEnd.Entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@Document(collection = "address")
public class Address {
    @Id
    private Long id;
    private String firstName;
    private String lastName;
    private String street;
    private String city;
    private String state;
    private Integer zipCode;
    private String mobile;



    private static Long val= 1L;

    public Long getVal(){
        return val++;
    }
}
