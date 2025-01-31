package org.pad.api.domain.dto.auth

import org.pad.api.domain.enums.Role
import java.util.UUID

data class UserDto(
    val name: String,
    val role: Role,
    val uuid: UUID
)
