package org.pad.api.domain.dto.auth

import java.util.*

data class AuthenticationResponseDto(val jwt: String, val expiration: Date)
