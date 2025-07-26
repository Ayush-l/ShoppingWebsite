package com.example.backEnd.Controllers;


import com.example.backEnd.Entities.Address;
import com.example.backEnd.Services.AddressServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

 
@RequestMapping("/address")
@RestController
public class AddressController {

    @Autowired
    private AddressServices addressServices;

    @PostMapping
    public ResponseEntity<Long> add(@RequestBody Address address){
        address.setId(address.getVal());
        addressServices.add(SecurityContextHolder.getContext().getAuthentication().getName(),address);
        return new ResponseEntity<>(address.getId(),HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id){
        addressServices.remove(SecurityContextHolder.getContext().getAuthentication().getName(),id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> get(@PathVariable Long id){
        return new ResponseEntity<>(addressServices.get(id),HttpStatus.OK);
    }
}