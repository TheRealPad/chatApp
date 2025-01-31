package org.pad.api.controller.auth

import io.swagger.v3.oas.annotations.tags.Tag
import org.pad.api.domain.auth.User
import org.pad.api.domain.dto.auth.AuthenticationRequestDto
import org.pad.api.domain.dto.auth.AuthenticationResponseDto
import org.pad.api.domain.dto.auth.RegisterRequestDto
import org.pad.api.domain.dto.auth.RegisterResponseDto
import org.pad.api.repository.auth.UserRepository
import org.pad.api.utils.JwtUtil
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController(value = "auth controller")
@Tag(name = "Authentication", description = "Endpoints for authentication and user management")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val jwtUtil: JwtUtil,
    private val userDetailsService: UserDetailsService,
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {

    @PostMapping("/login")
    fun login(@RequestBody authenticationRequest: AuthenticationRequestDto): ResponseEntity<*> {
        val authenticationToken = UsernamePasswordAuthenticationToken(
            authenticationRequest.username,
            authenticationRequest.password
        )

        authenticationManager.authenticate(authenticationToken)

        val userDetails: UserDetails = userDetailsService.loadUserByUsername(authenticationRequest.username)
        val jwt = jwtUtil.generateToken(userDetails.username)
        val expirationDate: Date = jwtUtil.extractExpiration(jwt)

        return ResponseEntity.ok(AuthenticationResponseDto(jwt, expirationDate))
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody request: RegisterRequestDto): ResponseEntity<RegisterResponseDto> {
        if (userRepository.findByUsername(request.username) != null) {
            return ResponseEntity.badRequest().body(RegisterResponseDto(false, "Username is already taken"))
        }
        val hashedPassword = passwordEncoder.encode(request.password)
        val user = User()
        user.username = request.username
        user.password = hashedPassword
        userRepository.save(user)
        return ResponseEntity.ok(RegisterResponseDto(true, "User registered successfully"))
    }

}
