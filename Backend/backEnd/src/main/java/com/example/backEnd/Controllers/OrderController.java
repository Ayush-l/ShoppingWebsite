package com.example.backEnd.Controllers;

import com.example.backEnd.Entities.Address;
import com.example.backEnd.Entities.Order;
import com.example.backEnd.Services.CartService;
import com.example.backEnd.Services.EmailService;
import com.example.backEnd.Services.OrderService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CartService cartService;

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable ObjectId orderId){
        Order order=orderService.findOrderById(orderId);
        if(order==null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

    @GetMapping("/orderStatus/{orderId}")
    public ResponseEntity<Integer> getOrderStatus(@PathVariable ObjectId orderId){
        int x=orderService.getOrderStatus(orderId);
        if(x==-1){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(x,HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Boolean> placeOrder(){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        emailService.sendEmail(email,"Confirmation of Order Placement","ABE ORDER PLACE HOGYA");
        emailService.sendEmail("ayush_l@hs.iitr.ac.in","Confirmation of Order Placement","ABE ORDER PLACE HOGYA");
        cartService.deleteCart(email);
        return new ResponseEntity<>(true,HttpStatus.OK);
    }

}
