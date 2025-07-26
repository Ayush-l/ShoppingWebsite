package com.example.backEnd.Services;


import com.example.backEnd.Entities.Cart;
import com.example.backEnd.Entities.User;
import com.example.backEnd.Repositories.CartRepository;
import com.example.backEnd.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    public void saveUser(User user){
        user.setPassWord(passwordEncoder.encode(user.getPassWord()));
        userRepository.save(user);
    }

    private boolean checkPassWord(String passWord){
        int n=passWord.length();
        if(n<8||n>15) return false;
        boolean isNum=false,isCap=false,isSmall=false,isSpecial=false;
        for(int i=0;i<n;i++){
            char ch=passWord.charAt(i);
            if(ch<='9'&&ch>='0') isNum=true;
            else if(ch<='Z'&&ch>='A') isCap=true;
            else if(ch<='z'&&ch>='a') isSmall=true;
            else isSpecial=true;
        }
        return isNum&&isCap&&isSmall&&isSpecial;
    }
    public int saveNewUser(User user){
        if(userRepository.findById(user.getEmail()).isEmpty()){
            if(checkPassWord(user.getPassWord())){
                user.setCreatedAt(LocalDateTime.now());
                Cart cart=new Cart();
                cart.setUserEmail(user.getEmail());
                user.setCart(cart);
                user.setRole("user");
                user.setPassWord(passwordEncoder.encode(user.getPassWord()));
                cartRepository.save(cart);
                userRepository.save(user);
                return 2;
            }
            return 1;
        }
        return 0;
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public boolean deleteUser(String email){
        if(userRepository.findById(email).isEmpty()) return false;
        userRepository.deleteById(email);
        return true;
    }

    public boolean updateUser(User user){
        User user1=userRepository.findById(user.getEmail()).get();
        if(user1==null) return false;
        user1.setPassWord(passwordEncoder.encode(user.getPassWord()));
        user1.setFirstName(user.getFirstName());
        user1.setLastName(user.getLastName());
        userRepository.save(user1);
        return true;
    }

    public User findUser(String email){
        return userRepository.findById(email).get();
    }

    public boolean matchPassWord(String passWord,String encryptedPassWord){
        return passwordEncoder.matches(passWord,encryptedPassWord);
    }

}
