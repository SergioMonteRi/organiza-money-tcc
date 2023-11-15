package com.organizaMoney.service.user.infra;

import com.organizaMoney.service.user.application.UserServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserServices userServices;

    public UserController(UserServices userServices){
        this.userServices = userServices;
    }
    @PostMapping
    public ResponseEntity<UserDto> save(@Valid @RequestBody UserDto userDTO) {
        UserDto userDTOPersisted = userServices.save(userDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(userDTOPersisted.id()).toUri();
        return ResponseEntity.created(uri).body(userDTOPersisted);
    }
}
