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
class Chat : Instantiable() {

    var content: String? = null

    @Builder.Default
    @ManyToOne(fetch = FetchType.LAZY)
    var sender: User? = null

    @Builder.Default
    @ManyToOne(fetch = FetchType.LAZY)
    var parent: Chat? = null

    @Builder.Default
    @ManyToOne(fetch = FetchType.LAZY)
    var group: Group? = null

}
