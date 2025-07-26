package com.example.backEnd.Controllers;


import com.example.backEnd.Entities.User;
import com.example.backEnd.Services.UserService;
import com.example.backEnd.config.AppConfig;
import com.example.backEnd.config.JwtProvider;
import com.example.backEnd.responce.AuthResponse;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.example.backEnd.config.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController{

    @Autowired
    private UserService userService;

    @Autowired
    private UserServiceImpl customUserService;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/signup")
    public ResponseEntity<Void> createUserHandler(@RequestBody User user) throws ExecutionControl.UserException{
        int x=userService.saveNewUser(user);
        if(x==2) return new ResponseEntity<>(HttpStatus.CREATED);
        else if(x==1) return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user){
        String userName=user.getEmail();
        String passWord=user.getPassWord();
        Authentication authentication=authenticate(userName,passWord);
        if(authentication==null) return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token=jwtProvider.generateToken(authentication);
        AuthResponse authResponse=new AuthResponse(token,"signin Success");
        return new ResponseEntity<>(authResponse,HttpStatus.ACCEPTED);
    }

    @GetMapping("/all")
    public List<User> getAll(){
        return userService.findAll();
    }

    private Authentication authenticate(String userName,String passWord){
        UserDetails userDetails=customUserService.loadUserByUsername(userName);
        if(userDetails==null) return null;
        if(!userService.matchPassWord(passWord,userDetails.getPassword())) return null;
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }

}
