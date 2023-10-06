package com.codecool.colorup.forgotpassword.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class RegistrationMailSender {

    private final JavaMailSender mailSender;


    public void sendPasswordResetEmail(String email, String passwordResetToken) throws MessagingException, UnsupportedEncodingException {
        String subject = "Password Reset";
        String senderName = "User Registration Portal Service";
        String mailContent = "<p> Hi, "+ email + ", </p>"+
                "<p>To reset your password, please click on the following link: " + passwordResetToken + "</p>"+
                "<p>Thank you <br> Users Registration Portal Service";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("colortestmail@gmail.com", senderName);
        messageHelper.setTo(email);
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }
}
