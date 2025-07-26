package com.example.backEnd.Controllers;


import com.example.backEnd.Entities.Address;
import com.example.backEnd.Entities.Cart;
import com.example.backEnd.Entities.User;
import com.example.backEnd.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(){
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        userService.deleteUser(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<User> getUser(){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(userService.findUser(email),HttpStatus.OK);
    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> getCart(){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(userService.findUser(email).getCart(),HttpStatus.OK);
    }

    @GetMapping("/address")
    public ResponseEntity<List<Address>> getAddresses(){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(userService.findUser(email).getAddresses(),HttpStatus.OK);
    }

    @PutMapping("/change")
    public ResponseEntity<User> changeUser(@RequestBody User user){
        if(userService.updateUser(user)){
            return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(user,HttpStatus.BAD_REQUEST);
    }
}
