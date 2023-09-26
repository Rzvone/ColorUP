package com.codecool.colorup.controller;

import com.codecool.colorup.model.User;
import com.codecool.colorup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user
            ){
       return userService.updateUser(id,user);
    }
}
