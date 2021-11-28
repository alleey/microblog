package org.zabardast.common.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.istack.NotNull;
import java.util.HashMap;
import java.util.Map;

public class JsonUtils {

    public static String toJson(@NotNull Map attributes) {
        ObjectMapper objectMapper = new ObjectMapper();
        try
        {
            return objectMapper.writeValueAsString(attributes);
        }
        catch (JsonProcessingException e)
        {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public static Map fromJson(@NotNull String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try
        {
            return objectMapper.readValue(json, HashMap.class);
        }
        catch (JsonProcessingException e)
        {
            throw new RuntimeException(e.getMessage(), e);
        }
    }
}
