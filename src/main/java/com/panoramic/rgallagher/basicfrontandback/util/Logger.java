package com.panoramic.rgallagher.basicfrontandback.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * This logger class uses a functional paradigm to write out logging info
 * based on whatever logging level is declared at runtime.
 *
 * Notice the implementation using lambda expressions rather
 * than traditional declarative OOP.
 */
@Component
public class Logger {

    @Value("info")
    private String loggingLevel;

    public void log(LoggerItem logInfo){
        // perhaps these could be pushed out to cloudwatch or S3 for search and consumption
        LambdaLogger infoLog = (val) ->
           System.out.println("INFO: " + val.message);

        LambdaLogger errorLog = (val) ->
            System.out.println("Error: " + val.message + " Stack: " + val.error.getStackTrace());

        if(loggingLevel.matches("info")){
            infoLog.log(logInfo);
        }
        else{
            errorLog.log(logInfo);
        }

    }


}

interface LambdaLogger {
    void log(LoggerItem logInfo);
}

