package com.example.backEnd.Repositories;

import com.example.backEnd.Entities.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProductRepository extends MongoRepository<Product, Integer> {
    public List<Product> findAllByTopLevelCategory(String topLevelCategory);
    public List<Product> findAllBySecondLevelCategory(String secondLevelCategory);
    public List<Product> findAllByThirdLevelCategory(String thirdLevelCategory);
}
