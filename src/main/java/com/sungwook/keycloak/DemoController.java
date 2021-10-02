package com.sungwook.keycloak;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/testa")
    public String testa(){
        return "testA";
    }

    @GetMapping("/testb")
    public String testb(){
        return "testB";
    }

    @GetMapping("/testc")
    public String testc(){
        return "testC";
    }
}
