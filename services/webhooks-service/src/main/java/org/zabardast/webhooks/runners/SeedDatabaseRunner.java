package org.zabardast.webhooks.runners;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.zabardast.webhooks.config.InitialImportConfig;
import org.zabardast.webhooks.services.EventHandlerService;

@Slf4j
@Profile("!test")
@Configuration
class SeedDatabaseRunner implements ApplicationRunner {

    public static final String UserIdUnknown = "00000000-0000-0000-0000-000000000000";
    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";
    public static final String UserId1 = "473165a5-e52c-4129-9b28-61e0e018b0e1";
    public static final String UserId2 = "08cb7f2e-e8e0-4352-a9b6-7ef4fd683ea3";
    public static final String UserId3 = "13324963-cb7e-49d1-947a-cdda3d0e9282";

    @Autowired
    InitialImportConfig initialImportConfig;
    @Autowired
    EventHandlerService eventHandlerService;

    @Override
    public void run(ApplicationArguments args) throws Exception {

    }

}
