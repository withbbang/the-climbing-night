package com.admin.the_climbing_night.utils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.admin.the_climbing_night.annotations.DatabaseCryptoFieldAnnotation;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.CustomException;
import lombok.extern.slf4j.Slf4j;
import java.lang.reflect.Field;

/**
 * 암복호화 클래스
 */
@Slf4j
@Component
public class Crypto {
    @Value("${key.database.aes-key}")
    private String DATABASE_KEY;

    @Value("${key.section.aes-key}")
    private String SECTION_KEY;

    /**
     * AES 암호화
     * 
     * @param plainText
     * @return
     * @throws CustomException
     */
    public String encrypt(String plainText, String type) throws CustomException {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            String key = type.equals("database") ? DATABASE_KEY : SECTION_KEY;

            SecretKeySpec secretKey =
                    new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "AES");
            IvParameterSpec IV = new IvParameterSpec(key.substring(0, 16).getBytes());

            cipher.init(Cipher.ENCRYPT_MODE, secretKey, IV);

            byte[] encryptedText = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

            return Base64.getEncoder().encodeToString(encryptedText);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new CustomException(CodeMessage.ER0001);
        }
    }

    /**
     * AES 복호화
     * 
     * @param encryptedText
     * @return
     * @throws CustomException
     */
    public String decrypt(String encryptedText, String type) throws CustomException {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            String key = type.equals("database") ? DATABASE_KEY : SECTION_KEY;

            SecretKeySpec secretKey =
                    new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "AES");
            IvParameterSpec IV = new IvParameterSpec(key.substring(0, 16).getBytes());

            cipher.init(Cipher.DECRYPT_MODE, secretKey, IV);

            byte[] decryptedByte = Base64.getDecoder().decode(encryptedText);

            return new String(cipher.doFinal(decryptedByte), StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new CustomException(CodeMessage.ER0001);
        }
    }

    /**
     * Aspect 암호화 과정
     * 
     * @param arg
     * @throws Exception
     */
    public void encryptData(Object arg) throws Exception {
        if (arg == null)
            return;

        Field[] fields = arg.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(DatabaseCryptoFieldAnnotation.class)) {
                field.setAccessible(true);
                String originalValue = (String) field.get(arg);
                if (originalValue != null) {
                    try {
                        String newValue = encrypt((String) originalValue, "database");
                        field.set(arg, newValue);
                    } catch (Exception e) {
                        log.error("Encrypt Data Error: ", e);
                        throw e;
                    }
                }
            }
        }
    }

    /**
     * Aspect 복호화 과정
     * 
     * @param arg
     * @throws Exception
     */
    public void decryptData(Object arg) throws Exception {
        if (arg == null)
            return;

        Field[] fields = arg.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(DatabaseCryptoFieldAnnotation.class)) {
                field.setAccessible(true);
                String originalValue = (String) field.get(arg);
                if (originalValue != null) {
                    try {
                        String newValue = decrypt((String) originalValue, "database");
                        field.set(arg, newValue);
                    } catch (Exception e) {
                        log.error("Decrypt Data Error: ", e);
                        throw e;
                    }
                }
            }
        }
    }
}
