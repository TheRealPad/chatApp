package org.pad.api.service.auth

import org.pad.api.domain.auth.User
import org.pad.api.repository.auth.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class UserContext {

    @Autowired
    private lateinit var userRepository: UserRepository

    fun getCurrentUsername(): String? {
        val authentication = SecurityContextHolder.getContext().authentication
        if (authentication != null && authentication.isAuthenticated) {
            val principal = authentication.principal
            return if (principal is UserDetails) {
                principal.username
            } else {
                principal.toString()
            }
        }
        return null
    }

    fun getCurrentUserUuid(): UUID? {
        val authentication = SecurityContextHolder.getContext().authentication
        return if (authentication != null && authentication.isAuthenticated && authentication.principal is UserDetails) {
            return userRepository.findByUsername((authentication.principal as UserDetails).username)?.uuid
        } else {
            null
        }
    }

    fun getCurrentUserDetails(): UserDetails? {
        val authentication = SecurityContextHolder.getContext().authentication
        return if (authentication != null && authentication.isAuthenticated && authentication.principal is UserDetails) {
            authentication.principal as UserDetails
        } else {
            null
        }
    }

    fun getCurrentUser(): User {
        val authentication = SecurityContextHolder.getContext().authentication
        if (authentication != null && authentication.isAuthenticated && authentication.principal is UserDetails) {
            val user = userRepository.findByUsername((authentication.principal as UserDetails).username)
                ?: throw Exception("User context not found")
            return user
        } else {
            throw Exception("User context not found")
        }
    }

}
