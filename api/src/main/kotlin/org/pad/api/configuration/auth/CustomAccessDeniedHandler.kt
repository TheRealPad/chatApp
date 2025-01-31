package org.pad.api.configuration.auth

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.web.access.AccessDeniedHandler
import org.springframework.stereotype.Component
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

@Component
class CustomAccessDeniedHandler : AccessDeniedHandler {

    override fun handle(
        request: HttpServletRequest,
        response: HttpServletResponse,
        accessDeniedException: AccessDeniedException
    ) {
        response.status = HttpServletResponse.SC_FORBIDDEN
        response.contentType = "application/json"

        val responseBody = mapOf(
            "timestamp" to System.currentTimeMillis(),
            "status" to HttpServletResponse.SC_FORBIDDEN,
            "error" to "Forbidden",
            "message" to "You do not have permission to access this resource",
            "path" to request.requestURI
        )

        response.writer.write(jacksonObjectMapper().writeValueAsString(responseBody))
    }
}
