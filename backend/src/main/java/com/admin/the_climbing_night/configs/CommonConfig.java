package com.admin.the_climbing_night.configs;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommonConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
