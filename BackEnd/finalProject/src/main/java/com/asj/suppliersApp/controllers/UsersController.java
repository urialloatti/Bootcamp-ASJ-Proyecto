package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.UserCredentialsRequestDTO;
import com.asj.suppliersApp.dto.request.UserRequestDTO;
import com.asj.suppliersApp.dto.response.UserResponseDTO;
import com.asj.suppliersApp.dto.response.UserValidationResponseDTO;
import com.asj.suppliersApp.services.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/app/users")
public class UsersController {
    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserCredentialsRequestDTO credentials) {
        Optional<UserResponseDTO> response = this.usersService.loginUser(credentials);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }

    @PostMapping("/check-credentials")
    public ResponseEntity<UserValidationResponseDTO> checkCredentials(@RequestBody UserCredentialsRequestDTO credentials) {
        return ResponseEntity.ok().body(this.usersService.validateUser(credentials));
    }

    @PatchMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestBody UserCredentialsRequestDTO credentials) {
        return ResponseEntity.ok().body((this.usersService.checkUsernameExists(credentials)));
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDTO> signup(@RequestBody UserRequestDTO request) {
        Optional<UserResponseDTO> response = this.usersService.createUser(request);
        if (response.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(response.get());
    }
}