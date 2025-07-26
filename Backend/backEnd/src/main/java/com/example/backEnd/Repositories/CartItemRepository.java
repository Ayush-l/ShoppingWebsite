package com.example.backEnd.Repositories;

import com.example.backEnd.Entities.CartItem;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartItemRepository extends MongoRepository<CartItem, Long> {
}
