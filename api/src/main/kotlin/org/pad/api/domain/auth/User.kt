package org.pad.api.domain.auth

import com.fasterxml.jackson.annotation.JsonIgnore
import io.swagger.v3.oas.annotations.Hidden
import jakarta.persistence.*
import lombok.Builder
import lombok.Getter
import lombok.Setter
import org.pad.api.domain.enums.Role
import org.pad.api.domain.structural.Instantiable

@Entity
@Getter
@Setter
class User : Instantiable() {

    var username: String? = null

    var password: String? = null

    @Enumerated(EnumType.STRING)
    var role: Role = Role.USER

    @Builder.Default
    @Hidden
    @ManyToMany(targetEntity = User::class, fetch = FetchType.LAZY)
    @JsonIgnore
    var friends: MutableList<User> = mutableListOf()
}
