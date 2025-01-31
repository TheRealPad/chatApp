package org.pad.api.error

import jakarta.servlet.http.HttpServletRequest
import org.pad.api.domain.error.ErrorResponse
import org.springframework.data.rest.webmvc.ResourceNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice
class RestExceptionHandler : ResponseEntityExceptionHandler() {

    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleResourceNotFound(ex: ResourceNotFoundException, request: HttpServletRequest): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            status = HttpStatus.NOT_FOUND.value(),
            error = "Not Found",
            message = ex.message ?: "Resource not found",
            timestamp = System.currentTimeMillis()
        )
        logger.warn("Failed to retrieve element at URI: ${request.requestURI}. Error: ${ex.message}")
        return ResponseEntity(errorResponse, HttpStatus.NOT_FOUND)
    }
}
