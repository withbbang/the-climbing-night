package com.admin.the_climbing_night.jwt;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j(topic = "UNAUTHORIZATION_EXCEPTION_HANDLER")
@AllArgsConstructor
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
        private final ObjectMapper objectMapper;

        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response,
                        AuthenticationException authException)
                        throws IOException, ServletException {
                log.info("\n############################################################################## START ##############################################################################");
                log.error("Not Authenticated Request", authException);
                log.info("\n############################################################################### END ###############################################################################");

                SingleResponse errorResponse = new SingleResponse();
                errorResponse.setResult(new Result(CodeMessage.ER0001));

                String responseBody = objectMapper.writeValueAsString(errorResponse);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(responseBody);
        }
}
