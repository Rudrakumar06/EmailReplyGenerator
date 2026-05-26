package com.email.ReplyGenerator.Service;

import java.util.List;
import java.util.Map;
    
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.email.ReplyGenerator.Entity.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmailService {
    private final WebClient webClient;
    private final String apiKey;

    public EmailService(WebClient.Builder webClientBuilder,
                        @Value("${gemini.api.url}") String baseUrl,
                        @Value("${gemini.api.key}") String apiKey) { 
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
        this.apiKey = apiKey;
    }

    public String generateEmailReply(EmailRequest emailRequest) throws Exception {
        String prompt = buildPrompt(emailRequest);

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );
        String jsonBody = mapper.writeValueAsString(requestBody);

      
        String response = webClient.post()
                .uri("/v1beta/models/gemini-2.5-flash:generateContent")
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(jsonBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response: " + e.getMessage());
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        if (emailRequest.getEmailContent() == null || emailRequest.getEmailContent().isEmpty()) {
            throw new IllegalArgumentException("Email content cannot be null or empty");
        }

        String prompt = "Generate a professional reply (without subject )to the following email:\n\n";
        prompt += "Email Content: " + emailRequest.getEmailContent() + "\n";

        if (emailRequest.getTone() != null) {
            prompt += "Use a " + emailRequest.getTone() + " tone.\n"; // ✅ Fixed spacing
        }
        return prompt;
    }
}