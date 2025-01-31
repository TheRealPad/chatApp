package org.pad.api.configuration

import jakarta.persistence.Entity
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider
import org.springframework.context.annotation.Configuration
import org.springframework.core.type.filter.AnnotationTypeFilter
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.web.servlet.config.annotation.CorsRegistry


@Configuration
class RestConfiguration : RepositoryRestConfigurer {

    override fun configureRepositoryRestConfiguration(
        config: RepositoryRestConfiguration, cors: CorsRegistry
    ) {
        val scanner = ClassPathScanningCandidateComponentProvider(false)
        scanner.addIncludeFilter(AnnotationTypeFilter(Entity::class.java))
        val basePackage = "org.pad.api"
        val entityClasses = scanner.findCandidateComponents(basePackage)
            .map { Class.forName(it.beanClassName) }
        config.exposeIdsFor(*entityClasses.toTypedArray())
    }
}
