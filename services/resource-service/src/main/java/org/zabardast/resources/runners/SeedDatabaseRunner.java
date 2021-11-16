package org.zabardast.resources.runners;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Pattern;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.UrlResource;
import org.zabardast.resources.config.InitialImportConfig;
import org.zabardast.resources.dto.ResourceRequestRepresentation;
import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.resources.model.Resource;
import org.zabardast.resources.services.ResourceManagerService;

@Slf4j
@Profile("!test")
@Configuration
class SeedDatabaseRunner implements ApplicationRunner {

    @Autowired
    InitialImportConfig initialImportConfig;
    @Autowired
    ResourceManagerService manager;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        if(!initialImportConfig.isEnabled()) {
            return;
        }

        Pattern pattern = Pattern.compile(ResourceRequestRepresentation.VALID_NAME_PATTERN);
        Path storage = Paths.get(initialImportConfig.getLocation()).toAbsolutePath().normalize();
        log.info("Executing initial import of resources under: " + storage.toString());

        try {
            for (File dir : storage.toFile().listFiles()) {
                if(!dir.isDirectory())
                    continue;

                for (File file: dir.listFiles()) {
                    if(!file.isFile())
                        continue;

                    // Only import resources addressable through Rest/API
                    if(!pattern.matcher(dir.getName()).matches() ||
                            !pattern.matcher(file.getName()).matches())
                    {
                        log.warn("Ignoring import due to invalid names: " + dir.getName() + "/" + file.getName());
                        continue;
                    }

                    importResource(dir.getName(), file.getName(), new UrlResource(file.toURI()));
                }
            }
        } catch (Exception e) {
            log.warn("Resource import encountered an error: " + e.toString());
        }
    }

    void importResource(String resource, String key, org.springframework.core.io.Resource contents) {
        try {
            ResourceResponseRepresentation resp = manager.newResource(
                    Resource.AnonymousOwner,
                    ResourceRequestRepresentation.builder()
                        .resource(resource)
                        .key(key)
                        .build(),
                    contents);
            log.info(resp.toString());
        }
        catch (Exception e) {
            log.warn("Resource import encountered an error: " + e.getMessage());
        }
    }
}
