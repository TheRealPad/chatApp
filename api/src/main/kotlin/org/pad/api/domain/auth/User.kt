package org.pad.api.domain.auth

import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
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

}
