package org.pad.api.domain

import lombok.Getter
import lombok.Setter
import org.pad.api.domain.auth.User

@Getter
@Setter
class WebSocketUser(user: User, sessionId: String) {

    val user: User = User()

    val sessionId: String = ""

}
