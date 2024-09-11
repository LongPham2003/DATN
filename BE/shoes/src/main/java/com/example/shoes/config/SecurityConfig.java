package com.example.shoes.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final String[] PUBLIC_ENDPOINTS = {"/user/add","/auth/login","/user/getList","/user/update/**","/user/delete"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(request ->
                request.requestMatchers(PUBLIC_ENDPOINTS).permitAll()
//                        .requestMatchers(HttpMethod.GET,"/users")
//                           //     .hasAuthority("ROLE_ADMIN") có thể dùng cách dưới
//                        .hasRole(Role.ADMIN.name())
                        .anyRequest().authenticated());

//        httpSecurity.oauth2ResourceServer(oauth2 ->
//                oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(customJwtDecoder)
//                                .jwtAuthenticationConverter(jwtAuthenticationConverter()))
//                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
//        );

        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        return httpSecurity.build();
    }
}
