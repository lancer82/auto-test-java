package com.thinlk.utility;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

/**
 * @Author lipeng
 * @Date 22:09 10/13/2021
 * @Description //TODO
 */
public class PropertiesReader {

    private static Properties properties = new Properties();

    public static Properties readProperties(String propertiesPath) throws IOException {

        InputStream inputStream = new FileInputStream(propertiesPath);
        InputStreamReader inputStreamReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
        BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
        properties.load(bufferedReader);
        return properties;
    }
}
