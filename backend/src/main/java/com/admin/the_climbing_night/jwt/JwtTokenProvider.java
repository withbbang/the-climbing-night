package com.admin.the_climbing_night.jwt;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.admin.the_climbing_night.auth.vo.GetIsLoggedInVo;
import com.admin.the_climbing_night.jwt.vo.JwtTokenVo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenProvider {
    private final Key key;
    private final long ACCESS_TOKEN_EXP_TIME;
    private final long REFRESH_TOKEN_EXP_TIME;

    /**
     * jwt 토큰 생성자
     * 
     * @param secretKey
     * @param accessTokenExpTime
     * @param refreshTokenExpTime
     */
    public JwtTokenProvider(@Value("${jwt.secret-key}") String secretKey,
            @Value("${jwt.access-token-exp-time}") long accessTokenExpTime,
            @Value("${jwt.refresh-token-exp-time}") long refreshTokenExpTime) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.ACCESS_TOKEN_EXP_TIME = accessTokenExpTime;
        this.REFRESH_TOKEN_EXP_TIME = refreshTokenExpTime;
    }

    /**
     * Access, Refresh Token 생성
     * 
     * @param vo
     * @return Map<String, String>
     */
    public Map<String, String> createToken(JwtTokenVo vo) {
        String accessToken = createAccessToken(vo, ACCESS_TOKEN_EXP_TIME);
        String refreshToken = createRefreshToken(vo, REFRESH_TOKEN_EXP_TIME);

        Map<String, String> token = new HashMap<>();

        token.put("accessToken", accessToken);
        token.put("refreshToken", refreshToken);

        return token;
    }

    /**
     * Access Token 생성
     * 
     * @param vo
     * @param expireTime
     * @return String
     */
    private String createAccessToken(JwtTokenVo vo, long expireTime) {
        Claims claims = Jwts.claims();

        claims.put("memberId", vo.getMemberId());
        claims.put("grade", vo.getGrade());
        claims.put("name", vo.getName());

        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime tokenValidity = now.plusSeconds(expireTime);

        return Jwts.builder().setClaims(claims).setIssuedAt(Date.from(now.toInstant()))
                .setExpiration(Date.from(tokenValidity.toInstant()))
                .signWith(key, SignatureAlgorithm.HS256).compact();
    }

    /**
     * Refresh Token 생성
     * 
     * @param member
     * @param expireTime
     * @return String
     */
    private String createRefreshToken(JwtTokenVo member, long expireTime) {
        Claims claims = Jwts.claims();

        claims.put("memberId", member.getMemberId());
        claims.put("name", member.getName());

        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime tokenValidity = now.plusSeconds(expireTime);

        return Jwts.builder().setClaims(claims).setIssuedAt(Date.from(now.toInstant()))
                .setExpiration(Date.from(tokenValidity.toInstant()))
                .signWith(key, SignatureAlgorithm.HS256).compact();
    }

    /**
     * AccessToken에서 Admin 정보 추출
     * 
     * @param accessToken
     * @return User ID
     */
    public GetIsLoggedInVo getAdminInfo(String accessToken) {
        GetIsLoggedInVo memberInfo = new GetIsLoggedInVo();

        memberInfo.setMemberId(parseClaims(accessToken).get("memberId", String.class));
        memberInfo.setGrade(parseClaims(accessToken).get("grade", String.class));
        memberInfo.setName(parseClaims(accessToken).get("name", String.class));
        memberInfo.setAccessToken(accessToken);

        return memberInfo;
    }

    /**
     * JWT 검증
     * 
     * @param token
     * @return IsValidate
     */
    public boolean validateToken(String token) throws Exception {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
            throw e;
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
            throw e;
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
            throw e;
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
            throw e;
        }
    }

    /**
     * JWT Claims 추출
     * 
     * @param accessToken
     * @return JWT Claims
     */
    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
