package com.example.shoes.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    JavaMailSender mailSender;

    public void sendEmailPasword(String to, String subject, String password) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        String htmlBody = "<html>"
                + "<head>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; background-color: #007bff; color: #ffffff; padding: 20px; }"
                + ".container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 4px; }"
                + "h1 { text-align: center; color: #007bff; }"
                + "img.logo { display: block; margin: 0 auto; }"
                + ".form-group { text-align: center; }"
                + "label { display: block; font-weight: bold; margin-bottom: 5px; }"
                + "input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }"
                + "button { background-color: #0056b3; color: #fff; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }"
                + "button:hover { background-color: #003d80; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<h1> BEE SHOES </h1>"
                + "<form>"
                + "<div class='form-group'>"
                + "<label for='username'>Tài khoản :&nbsp;" + to + " </label>"
                + "</div>"
                + "<div class='form-group'>"
                + "<label for='password'>Password :&nbsp;" + password + "</label>"
                + "</div>"
                + "</form>"
                + "</div>"
                + "</body>"
                + "</html>";
        try {
            helper.setFrom("longptph330442@fpt.edu.vn");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


}
