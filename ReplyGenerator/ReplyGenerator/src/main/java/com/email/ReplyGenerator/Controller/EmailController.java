package com.email.ReplyGenerator.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.email.ReplyGenerator.Entity.EmailRequest;
import com.email.ReplyGenerator.Service.EmailService;

import lombok.AllArgsConstructor;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) throws Exception {
        String response = emailService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
