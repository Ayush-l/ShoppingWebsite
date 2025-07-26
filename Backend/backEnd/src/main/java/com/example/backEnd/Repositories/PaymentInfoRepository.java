package com.example.backEnd.Repositories;

import com.example.backEnd.Entities.PaymentInfo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface PaymentInfoRepository extends MongoRepository<PaymentInfo, ObjectId> {
}
