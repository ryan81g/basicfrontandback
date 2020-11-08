package com.panoramic.rgallagher.basicfrontandback.util;

public class LoggerItem {
        String message;
        Exception error = null; //  let this be null since info logs don't care about error info

    public LoggerItem(String message) {
        this.message = message;
    }
}
