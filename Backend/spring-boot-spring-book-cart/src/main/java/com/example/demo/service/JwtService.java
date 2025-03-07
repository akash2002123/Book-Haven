package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class JwtService {
    
    private final HttpServletRequest request;

    @Autowired
    public JwtService(HttpServletRequest request) {
        this.request = request;
    }

    public String getToken() {
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("JWT Token not found or invalid in request");
        }
        
        return authHeader.substring(7); // Remove "Bearer " prefix
    }
}
