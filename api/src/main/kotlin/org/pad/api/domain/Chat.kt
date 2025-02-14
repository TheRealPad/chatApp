package org.pad.api.domain

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import lombok.Builder
import lombok.Getter
import lombok.Setter
import lombok.ToString
import org.pad.api.domain.auth.User
import org.pad.api.domain.structural.Instantiable

@Entity
@Getter
@Setter
class Chat : Instantiable() {

    var content: String? = null

    @ManyToOne(targetEntity = User::class, fetch = FetchType.LAZY, optional = false)
    @ToString.Exclude
    var sender: User? = null

    @ManyToOne(targetEntity = Chat::class, fetch = FetchType.LAZY, optional = true)
    @ToString.Exclude
    var parent: Chat? = null

    @ManyToOne(targetEntity = Group::class, fetch = FetchType.LAZY, optional = false)
    @ToString.Exclude
    var group: Group? = null

    fun toJson(): String {
        val mapper: ObjectMapper = jacksonObjectMapper()
        return mapper.writeValueAsString(this)
    }
}
