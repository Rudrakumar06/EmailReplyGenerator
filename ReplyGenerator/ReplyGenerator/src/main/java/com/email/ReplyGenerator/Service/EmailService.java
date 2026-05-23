package com.email.ReplyGenerator.Service;

import java.util.List;
import java.util.Map;        // ✅ Correct import

import org.springframework.beans.factory.annotation.Value;    // ✅ Correct import
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.email.ReplyGenerator.Entity.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmailService {

    public String generateEmailReply(EmailRequest emailRequest) throws Exception {
        // Build the prompt for the language model
        String prompt = buildPrompt(emailRequest);
       // Call the language model API to generate a reply
        String apiResponse = callLanguageModelAPI(prompt);
        //Extract the generated reply from the API response
        String response = extractReplyFromApiResponse(apiResponse);
        // Return the generated reply
        return (response);
    }


}