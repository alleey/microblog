package org.zabardast.resources.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.zabardast.resources.config.StorageConfig;
import org.zabardast.resources.model.ResourceKey;
import org.zabardast.resources.services.exceptions.FileNotFoundException;
import org.zabardast.resources.services.exceptions.StorageException;

@Slf4j
@Service
public class FilesytemStorageService implements StorageService {
    private final Path storage;

    @Autowired
    public FilesytemStorageService(StorageConfig config) {
        storage = Paths.get(config.getStoreLocation()).toAbsolutePath().normalize();
        log.info("Resource storage path set to " + storage.toString());
    }

    public String getResolvableMoniker(ResourceKey key) {
        return Path.of(key.getResource(), key.getKey()).toString();
    }

    public Resource load(String fileName) {
        try
        {
            Path filePath = this.storage.resolve(fileName).normalize();
            log.info("load resource from path " + filePath.toString());
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            }
            throw new FileNotFoundException("File not found " + filePath.toString());
        } catch (MalformedURLException e) {
            throw new StorageException("File not found " + fileName);
        }
    }


    public void save(String fileName, Resource resource) {
        try {
            Path filePath = this.storage.resolve(fileName).normalize();
            log.info("save resource to path " + filePath.toString());
            ensureDirectories(filePath.getParent());
            Files.copy(resource.getInputStream(), this.storage.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public void delete(String fileName) {
        try {
            Path filePath = this.storage.resolve(fileName).normalize();
            log.info("delete resource at path " + filePath.toString());

            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Could not delete the file. Error: " + e.getMessage());
        }
    }

    void ensureDirectories(Path directory) {
        try {
            Files.createDirectories(directory);
        } catch (IOException e) {
            throw new StorageException(e.getMessage());
        }
    }

}
