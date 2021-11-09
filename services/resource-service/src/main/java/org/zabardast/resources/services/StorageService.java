package org.zabardast.resources.services;

import org.springframework.core.io.Resource;
import org.zabardast.resources.model.ResourceKey;

public interface StorageService {
    String getResolvableMoniker(ResourceKey key);

    Resource load(String fileName);
    void save(String fileName, Resource resource);
    void delete(String fileName);
}
