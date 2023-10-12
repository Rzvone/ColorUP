package com.codecool.colorup.admin;

import com.codecool.colorup.model.Product;
import com.codecool.colorup.model.ServiceProvided;
import com.codecool.colorup.model.User;
import com.codecool.colorup.service.ProductDTO;
import com.codecool.colorup.service.ProductService;
import com.codecool.colorup.service.ProviderService;
import com.codecool.colorup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService; // Assuming you have a UserService class
    private final ProviderService providerService; // Assuming you have a ProviderService class
    private final ProductService productService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminController(UserService userService, ProviderService providerService, ProductService productService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.providerService = providerService;
        this.productService = productService;
        this.passwordEncoder = passwordEncoder;
    }
@GetMapping("/getPendingProviders")
public List<User> getPendingProviders(){
        return userService.getPendingProviders();
}
    @PostMapping("/makeprovider")
    public ResponseEntity<String> makeProvider(@RequestBody MakeProviderRequest request) {

        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<ServiceProvided> services = request.getServices();

        try {
            providerService.MakeUserProvider(user, services);
            return ResponseEntity.ok("User successfully converted to a provider");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
    private final String UPLOAD_DIRECTORY = "C:/Users/raduz/CodecoolJava/ColorUp/backend/src/main/resources/images";


    @PostMapping("/createProduct")
    public String createProduct(@RequestParam("image") MultipartFile file, @ModelAttribute ProductDTO productDTO, Model model) throws IOException {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        product.setDescription(productDTO.getDescription());

        // Save the product to your database or use JPA repository to save it
        productService.saveProduct(product);

        if (product.getId() != null) {
            String imageFilename = product.getId() + getFileExtension(file.getOriginalFilename());
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, imageFilename);

            try {
                Files.write(fileNameAndPath, file.getBytes());
                model.addAttribute("msg", "Product created successfully with ID: " + product.getId());
            } catch (IOException e) {
                // Handle the file write exception
                model.addAttribute("msg", "File upload failed");
            }
        } else {
            // Handle the case where the product doesn't have a valid ID
            model.addAttribute("msg", "Product creation failed");
        }

        return "imageupload/index";
    }

    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf(".");
        if (dotIndex > 0) {
            return filename.substring(dotIndex);
        }
        return ""; // Default to empty string if no extension found
    }

}



