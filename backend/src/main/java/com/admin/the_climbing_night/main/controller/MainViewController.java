package com.admin.the_climbing_night.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainViewController {
    @GetMapping("/")
    public String main(Model model) {
        model.addAttribute("main1", "Macho");
        model.addAttribute("main2", "상남자");

        return "main";
    }
}
