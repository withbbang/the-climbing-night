package com.admin.the_climbing_night.utils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.admin.the_climbing_night.annotations.DatabaseCryptoFieldAnnotation;
import com.admin.the_climbing_night.annotations.SectionDecryptFieldAnnotation;
import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;
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
    private String encrypt(String plainText, String type) throws CustomException {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            String key = type.equals("database") ? DATABASE_KEY : SECTION_KEY;

            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "AES");
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
    private String decrypt(String encryptedText, String type) throws CustomException {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            String key = type.equals("database") ? DATABASE_KEY : SECTION_KEY;

            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "AES");
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
     * SingleResponse에 담겨져 내려가는 데이터값들을 암호화 하기 위한 재귀 메서드
     * 
     * @param arg
     * @throws Exception
     */
    private void processFields(Object arg) throws Exception {
        Field[] fields = arg.getClass().getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);

            // Check if the field is annotated with @SectionEncryptFieldAnnotation
            if (field.isAnnotationPresent(SectionEncryptFieldAnnotation.class)) {
                Object fieldValue = field.get(arg);
                if (fieldValue instanceof String) {
                    try {
                        String encryptedValue = encrypt((String) fieldValue, "section");
                        field.set(arg, encryptedValue);
                    } catch (Exception e) {
                        log.error("Encrypt Data Error: ", e);
                        throw e;
                    }
                }
            } else {
                // If the field is not annotated but is an object, recurse into it
                Object fieldValue = field.get(arg);
                if (fieldValue != null && !isPrimitiveOrWrapper(fieldValue.getClass())) {
                    processFields(fieldValue);
                }
            }
        }
    }

    /**
     * SingleResponse에 담겨져 내려가는 데이터값들을 암호화 하기 위한 부속 메서드
     * 
     * @param clazz
     * @return
     */
    private boolean isPrimitiveOrWrapper(Class<?> clazz) {
        return clazz.isPrimitive() ||
                clazz.equals(String.class) ||
                Number.class.isAssignableFrom(clazz) ||
                Boolean.class.isAssignableFrom(clazz) ||
                Character.class.isAssignableFrom(clazz);
    }

    /**
     * Database Aspect 암호화 과정
     * 
     * @param arg
     * @throws Exception
     */
    public void encryptDataForDatabase(Object arg) throws Exception {
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
     * Database Aspect 복호화 과정
     * 
     * @param arg
     * @throws Exception
     */
    public void decryptDataForDatabase(Object arg) throws Exception {
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

    /**
     * 네트워크 구간 Aspect 암호화 과정
     * 
     * @param arg
     * @throws Exception
     */
    public void encryptDataForSection(Object arg) throws Exception {
        if (arg == null)
            return;

        processFields(arg);
    }

    /**
     * 네트워크 구간 Aspect 복호화 과정
     * 
     * @param arg
     * @throws Exception
     */
    public void decryptDataForSection(Object arg) throws Exception {
        if (arg == null)
            return;

        Field[] fields = arg.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(SectionDecryptFieldAnnotation.class)) {
                field.setAccessible(true);
                String originalValue = (String) field.get(arg);
                if (originalValue != null) {
                    try {
                        String newValue = decrypt((String) originalValue, "section");
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
