package com.codecool.colorup;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

import java.util.Objects;

@SpringBootApplication
@PropertySource("classpath:application.properties")
public class ColorupApplication {

	public static void main(String[] args) {

		SpringApplication.run(ColorupApplication.class, args);
	}

}
