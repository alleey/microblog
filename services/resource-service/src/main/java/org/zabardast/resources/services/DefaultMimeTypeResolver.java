package org.zabardast.resources.services;

import javax.activation.MimetypesFileTypeMap;
import org.springframework.stereotype.Component;

@Component
public class DefaultMimeTypeResolver implements MimeTypeResolver {
    @Override
    public String resolveMimeType(String filename) {
        MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();
        String mimeType = fileTypeMap.getContentType(filename);
        return mimeType;
    }
}
