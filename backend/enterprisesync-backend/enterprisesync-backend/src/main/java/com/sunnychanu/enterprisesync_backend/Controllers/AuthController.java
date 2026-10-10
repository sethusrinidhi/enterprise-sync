package com.sunnychanu.enterprisesync_backend.Controllers;

import com.sunnychanu.enterprisesync_backend.Model.User;
import com.sunnychanu.enterprisesync_backend.dto.AuthRequest;
import com.sunnychanu.enterprisesync_backend.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class AuthController {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    public AuthController(JwtTokenProvider tokenProvider, UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is already taken!"));
        }

        User savedUser = userRepository.save(newUser);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully in MySQL");
        response.put("username", savedUser.getUsername());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest authRequest) {
        Optional<User> userOpt = userRepository.findByUsername(authRequest.getUsername());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "User not found in database! Please register first."));
        }

        User user = userOpt.get();

        String storedPassword = user.getPassword();
        if (storedPassword == null || !storedPassword.equals(authRequest.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid security passkey!"));
        }

        String token = tokenProvider.generateToken(user.getUsername());

        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", token);
        response.put("tokenType", "Bearer");
        response.put("username", user.getUsername());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }
}