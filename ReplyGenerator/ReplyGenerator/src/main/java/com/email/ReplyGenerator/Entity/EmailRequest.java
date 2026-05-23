package com.email.ReplyGenerator.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class EmailRequest {
    private String emailContent;

   private String tone;
}
