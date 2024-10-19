package com.Wizards.MockTrade.filter;

import com.Wizards.MockTrade.service.JwtService;
import com.Wizards.MockTrade.service.MyUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if(authHeader != null && authHeader.startsWith("Bearer")){
            token = authHeader.substring(7);
            username = jwtService.extractUsername(token);
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){

            UserDetails userDetails = context.getBean(MyUserDetailService.class).loadUserByUsername(username);

            if(jwtService.validateToken(token , username)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails , null , userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }


        filterChain.doFilter(request, response);
    }
}

//@Component
//public class JwtFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private JwtService jwtService;
//
//    @Autowired
//    ApplicationContext context;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String authHeader = request.getHeader("Authorization");
//        String token = null;
//        String username = null;
//
//        // Check if Authorization header is present
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            token = authHeader.substring(7);  // Extract JWT from Bearer token
//        } else {
//            // If Authorization header is not present, check HttpOnly cookie
//            if (request.getCookies() != null) {
//                for (Cookie cookie : request.getCookies()) {
//                    if (cookie.getName().equals("jwtToken")) {  // Assuming the JWT is stored in a cookie named 'jwtToken'
//                        token = cookie.getValue();
//                        break;
//                    }
//                }
//            }
//        }
//
//        // Proceed if a token is found
//        if (token != null) {
//            username = jwtService.extractUsername(token);
//
//            // If username is found and user is not authenticated
//            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//
//                // Load user details and validate the token
//                UserDetails userDetails = context.getBean(MyUserDetailService.class).loadUserByUsername(username);
//
//                if (jwtService.validateToken(token, username)) {
//                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                            userDetails, null, userDetails.getAuthorities());
//                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authToken);  // Authenticate user
//                }
//            }
//        }
//
//        filterChain.doFilter(request, response);  // Continue the request
//    }
//}

