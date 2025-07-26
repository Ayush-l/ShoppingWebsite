package com.example.backEnd.Entities;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Data
@NoArgsConstructor
@Component
public class Cart {
    @Id
    private String userEmail;

    @DBRef
    private List<CartItem> cartItems=new ArrayList<>();

    public void addCartItem(CartItem cartItem){
        cartItems.add(cartItem);
    }

}
