package com.example.backEnd.responce;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@Component
public class AuthResponse {
    private String jwt;
    private String message;

    public AuthResponse(String jwt,String message){
        super();
        this.jwt=jwt;
        this.message=message;
    }

}
