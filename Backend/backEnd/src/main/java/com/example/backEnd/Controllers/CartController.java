package com.example.backEnd.Controllers;

import com.example.backEnd.Entities.CartItem;
import com.example.backEnd.Services.CartService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RequestMapping("/cart")
@RestController
public class CartController {

    @Autowired
    public CartService cartService;

    @PostMapping("/{productId}/{size}")
    public ResponseEntity<Boolean> addToCart(@PathVariable Integer productId,@PathVariable int size){
        if(cartService.addToCart(productId,SecurityContextHolder.getContext().getAuthentication().getName(),size)){
            return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{cartItemId}/{size}")
    public ResponseEntity<Boolean> updateCartItem(@PathVariable long cartItemId,@PathVariable int size){
        if(cartService.updateCartItem(SecurityContextHolder.getContext().getAuthentication().getName(),size,cartItemId)){
            return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/change/{cartItemId}/{inc}")
    public ResponseEntity<Boolean> changeQuantity(@PathVariable long cartItemId,@PathVariable boolean inc){
        boolean x=cartService.changeQuantity(SecurityContextHolder.getContext().getAuthentication().getName(),cartItemId,inc);
        if(x){
            return new ResponseEntity<>(true,HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Boolean> deleteItem(@PathVariable Long cartItemId){
        if(cartService.deleteFromCart(SecurityContextHolder.getContext().getAuthentication().getName(),cartItemId)){
            return new ResponseEntity<>(true,HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/items")
    public ResponseEntity<ArrayList<CartItem>> getCartItems(){
        ArrayList<CartItem> list=cartService.getItems(SecurityContextHolder.getContext().getAuthentication().getName());
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

}
