package com.codecool.colorup.controller;

import com.codecool.colorup.config.JwtService;
import com.codecool.colorup.model.User;
import com.codecool.colorup.service.UpdateResponse;
import com.codecool.colorup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private final UserService userService;
    @Autowired
    private final JwtService jwtService;
    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    @GetMapping("/getAllUsers")
    public List<User> getUser(){
        return userService.getUsers();
    }

    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/postUser")
    public ResponseEntity<String> registerNewUser(@RequestBody User user){
       return ResponseEntity.ok(userService.addNewUser(user));
    }

    @PutMapping(path = "/updateUser/{id}")
    public UpdateResponse updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
//        try {
            // 1. Verify the JWT token and extract user information from it.
//            Claims claims = jwtService.decode(authorizationHeader);

            // 2. Check if the user ID extracted from the token matches the {id} path variable.
//            Long userIdFromToken = Long.parseLong(claims.getSubject());
//            if (!userIdFromToken.equals(id)) {
//                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to update this user's profile.");
//            }

            // 3. Perform the update operation based on the updatedUser object.
            User userToUpdate = userService.getUserById(id);
            if (userToUpdate == null) {
                return UpdateResponse.builder().updatedUser(null).message("User not found").build();
            }

            // Update user data here, for example:
            userToUpdate.setFirstName(updatedUser.getFirstName());
            userToUpdate.setLastName(updatedUser.getLastName());
            userToUpdate.setEmail(updatedUser.getEmail());
            userToUpdate.setContactNumber(updatedUser.getContactNumber());
            // Update other fields as needed.

            // Save the updated user data to the database.
            userService.updateUser(id, userToUpdate);

            // 4. Return a success response.
//            return ResponseEntity.ok("User profile updated successfully.");
            return UpdateResponse.builder().updatedUser(updatedUser).message("Details updated successfully").build();
//        } catch (Exception e) {
//            // Handle any exceptions that may occur during token verification or the update operation.
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
//        }
    }



    @DeleteMapping(path ="/deleteUser/{id}" )
    public void deleteUser(@PathVariable Long id){
         userService.deleteUser(id);
    }
}
