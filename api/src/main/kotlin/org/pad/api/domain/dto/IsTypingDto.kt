package org.pad.api.domain.dto

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

class IsTypingDto(val user: String, val group: String, val isTyping: Boolean) {

    fun toJson(): String {
        val mapper: ObjectMapper = jacksonObjectMapper()
        return mapper.writeValueAsString(this)
    }

}
