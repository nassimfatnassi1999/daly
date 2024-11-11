package com.saccess.user.services;

import com.saccess.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;
    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("funky.ayed@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);

    }
    public void sendForgotPasswordEmail(User user, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        String resetPasswordLink = "http://localhost:4200/resetpassword/" + token;
        String subject = "Forgot Password";
        String text = "Dear "+ user.getFirstName() + ",\n\nYou have requested to reset your password. Please follow the link below to reset it:\n\n"+ resetPasswordLink +"\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe ESPREAT Team";
        message.setFrom("funky.ayed@gmail.com");
        message.setTo(user.getEmail());
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
}
