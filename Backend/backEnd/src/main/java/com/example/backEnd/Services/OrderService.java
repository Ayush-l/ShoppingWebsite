package com.example.backEnd.Services;

import com.example.backEnd.Entities.*;
import com.example.backEnd.Repositories.OrderRepository;
import com.example.backEnd.Repositories.ProductRepository;
import com.example.backEnd.Repositories.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public boolean placeOrder(String email, Address shippingAddress){
        try{
            User user=userRepository.findById(email).get();
            Order order=new Order();
            List<CartItem> products=new ArrayList<>();
            for(CartItem cartItem:user.getCart().getCartItems()) products.add(cartItem);
            order.setOrderItems(products);
            order.setDeliveryAddress(shippingAddress);
            order.setCurrentStage(1);
            user.getCart().setCartItems(new ArrayList<>());
            user.addOrder(order);
            orderRepository.save(order);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Order findOrderById(ObjectId orderId){
        return orderRepository.findById(orderId).get();
    }

    public List<Order> userOrderHistory(String email){
        Optional<User> optUser=userRepository.findById(email);
        return optUser.map(User::getOrders).orElse(null);
    }

    public int getOrderStatus(ObjectId orderId){
        try{
            return orderRepository.findById(orderId).get().getCurrentStage();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
