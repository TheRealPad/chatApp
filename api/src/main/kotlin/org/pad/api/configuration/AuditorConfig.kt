package org.pad.api.configuration

import org.pad.api.service.auth.UserContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.AuditorAware
import java.util.*

@Configuration
class AuditorConfig {

    @Autowired
    private lateinit var userContext: UserContext

    @Bean
    fun auditorProvider(): AuditorAware<String> {
        return AuditorAware {
            Optional.ofNullable(userContext.getCurrentUserUuid().toString())
        }
    }

}
