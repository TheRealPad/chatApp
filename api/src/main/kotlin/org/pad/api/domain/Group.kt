package org.pad.api.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import io.swagger.v3.oas.annotations.Hidden
import jakarta.persistence.*
import lombok.Builder
import lombok.Getter
import lombok.Setter
import org.pad.api.domain.auth.User
import org.pad.api.domain.structural.Instantiable

@Entity
@Getter
@Setter
class Group : Instantiable() {

    var name: String? = null

    var description: String? = null

    var isPersonal: Boolean? = null

    @ManyToOne(fetch = FetchType.EAGER)
    var sender: User? = null

    @Builder.Default
    @Hidden
    @ManyToMany(targetEntity = User::class, fetch = FetchType.LAZY)
    @JsonIgnore
    var members: MutableList<User> = mutableListOf()
}
