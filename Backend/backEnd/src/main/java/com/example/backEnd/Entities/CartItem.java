package com.example.backEnd.Entities;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class CartItem {
    @Id
    private long id;

    int size;
    int quantity;

    @DBRef
    private Product item;

    private static Long val= 1L;

    public Long getVal(){
        return val++;
    }

}
