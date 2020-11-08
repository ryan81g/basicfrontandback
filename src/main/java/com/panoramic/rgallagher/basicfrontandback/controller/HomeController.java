package com.panoramic.rgallagher.basicfrontandback.controller;

import com.panoramic.rgallagher.basicfrontandback.util.Logger;
import com.panoramic.rgallagher.basicfrontandback.util.LoggerItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    Logger logger;

    @GetMapping("/")
    public String homePage() {
        LoggerItem logInfo = new LoggerItem("Rendering home page");
        logger.log(logInfo);
        return "home";
    }
}
