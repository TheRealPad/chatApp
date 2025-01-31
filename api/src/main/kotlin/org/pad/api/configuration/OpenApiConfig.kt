package org.pad.api.configuration

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.tags.Tag
import io.swagger.v3.oas.models.security.SecurityRequirement
import io.swagger.v3.oas.models.security.SecurityScheme
import io.swagger.v3.oas.models.security.SecurityScheme.Type
import io.swagger.v3.oas.models.security.SecurityScheme.In
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class OpenApiConfig {

    @Bean
    fun customOpenAPI(): OpenAPI {
        val securitySchemeName = "bearerAuth"

        return OpenAPI()
            .info(Info().title("Document Management API").version("v1"))
            .addTagsItem(Tag().name("Authentication").description("Endpoints for authentication and user management"))
            .addSecurityItem(SecurityRequirement().addList(securitySchemeName))
            .components(
                io.swagger.v3.oas.models.Components()
                    .addSecuritySchemes(securitySchemeName,
                        SecurityScheme()
                            .name(securitySchemeName)
                            .type(Type.HTTP)
                            .`in`(In.HEADER)
                            .scheme("bearer")
                            .bearerFormat("JWT")
                    )
            )
    }
}
