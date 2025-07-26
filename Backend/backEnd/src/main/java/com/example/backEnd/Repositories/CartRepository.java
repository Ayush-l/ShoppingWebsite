package com.example.backEnd.Repositories;

import com.example.backEnd.Entities.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface CartRepository extends MongoRepository<Cart, String> {
}
