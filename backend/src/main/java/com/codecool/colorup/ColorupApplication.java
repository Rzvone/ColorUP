package com.codecool.colorup;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Objects;

@SpringBootApplication
@EnableTransactionManagement
public class ColorupApplication {

	public static void main(String[] args) {

		SpringApplication.run(ColorupApplication.class, args);
	}

}
