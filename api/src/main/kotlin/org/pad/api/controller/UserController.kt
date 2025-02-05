package org.pad.api.controller

import org.pad.api.domain.auth.User
import org.pad.api.domain.dto.auth.UserDto
import org.pad.api.domain.enums.Role
import org.pad.api.repository.auth.UserRepository
import org.pad.api.service.UserService
import org.pad.api.service.auth.UserContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*

@RestController(value = "user controller")
class UserController {

    @Autowired
    private lateinit var userContext: UserContext

    @Autowired
    private lateinit var userService: UserService

    @GetMapping("/whoami")
    fun whoami(): UserDto {
        val user = userContext.getCurrentUser() ?: return UserDto("John Doe", Role.USER, UUID.randomUUID())
        return UserDto(user.username.toString(), user.role, user.uuid)
    }

    @PostMapping("/addFriend/{id}")
    fun addFriend(@PathVariable id: UUID): MutableList<User> {
        return userService.addFriend(id)
    }

    @DeleteMapping("/removeFriend/{id}")
    fun removeFriend(@PathVariable id: UUID): MutableList<User> {
        return userService.removeFriend(id)
    }
}
