package com.Wizards.MockTrade.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaticController {

    private final ResourceLoader resourceLoader;

    public StaticController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @GetMapping(value = "/static/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/static/index.html";
    }
}
