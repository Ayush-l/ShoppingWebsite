package com.example.backEnd.Services;


import com.example.backEnd.Entities.*;
import com.example.backEnd.Repositories.ProductRepository;
import com.example.backEnd.Repositories.ReviewRepository;
import com.example.backEnd.Repositories.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    private boolean find(List<CartItem> orderItems, Product product){
        for(CartItem p:orderItems){
            if(p.getItem()==product) return true;
        }
        return false;
    }

    private boolean isPurchased(Product product, User user){
        for(Order order:user.getOrders()){
            if(find(order.getOrderItems(),product)||order.getCurrentStage()==-1||order.getCurrentStage()==3) return true;
        }
        return false;
    }

    public boolean createReview(Review review, String email, Integer productId){
        try{
            User user=userRepository.findById(email).get();
            Product product=productRepository.findById(productId).get();
            boolean purchased=isPurchased(product,user);
            if(purchased) {
                product.addReview(review);
                productRepository.save(product);
                user.addReview(review);
                userRepository.save(user);
                return true;
            }
            else return false;
        } catch (Exception e) {
            return false;
        }
    }

}
