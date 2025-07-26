package com.example.backEnd.Services;


import com.example.backEnd.Entities.Address;
import com.example.backEnd.Entities.User;
import com.example.backEnd.Repositories.AddressRepository;
import com.example.backEnd.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AddressServices {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    public void add(String email,Address address){
        User u=userRepository.findById(email).get();
        u.getAddresses().add(address);
        userRepository.save(u);
        addressRepository.save(address);
    }

    public void remove(String email,Long id){
        User u=userRepository.findById(email).get();
        u.getAddresses().removeIf((x)-> Objects.equals(x.getId(), id));
        userRepository.save(u);
        addressRepository.deleteById(id);
    }

    public Address get(Long id){
        return addressRepository.findById(id).get();
    }

}