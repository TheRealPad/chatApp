package org.pad.api.domain.dto

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.pad.api.domain.dto.auth.UserDto
import java.util.UUID

class GroupDto(val uuid: UUID, val name: String, val description: String, val isPersonal: Boolean, val members: MutableList<UserDto>) {

    fun toJson(): String {
        val mapper: ObjectMapper = jacksonObjectMapper()
        return mapper.writeValueAsString(this)
    }

}
