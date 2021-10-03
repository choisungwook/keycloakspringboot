package com.sungwook.keycloak;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
public class DemoController {

    @RolesAllowed("user")
    @GetMapping("/testa")
    public ResponseEntity<String> testa(){

        return ResponseEntity.ok("Testa");
    }

    @GetMapping("/testb")
    public String testb(){
        return "testB";
    }

    @RolesAllowed("admin")
    @GetMapping("/testc")
    public String testc(){
        return "testC";
    }
}
