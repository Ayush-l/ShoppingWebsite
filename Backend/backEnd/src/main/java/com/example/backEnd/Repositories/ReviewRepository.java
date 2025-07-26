package com.example.backEnd.Repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface ReviewRepository extends MongoRepository<ReviewRepository, ObjectId> {
}
