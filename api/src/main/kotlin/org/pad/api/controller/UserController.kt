package org.pad.api.controller

import org.pad.api.domain.dto.auth.UserDto
import org.pad.api.domain.enums.Role
import org.pad.api.service.auth.UserContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController(value = "user controller")
class UserController {

    @Autowired
    private lateinit var userContext: UserContext

    @GetMapping("/whoami")
    fun whoami(): UserDto {
        val user = userContext.getCurrentUser() ?: return UserDto("John Doe", Role.USER, UUID.randomUUID())
        return UserDto(user.username.toString(), user.role, user.uuid)
    }
}
