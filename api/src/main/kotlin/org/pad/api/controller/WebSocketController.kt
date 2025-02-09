package org.pad.api.controller

import org.pad.api.domain.auth.User
import org.pad.api.repository.auth.UserRepository
import org.pad.api.service.WebSocketService
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.messaging.simp.SimpMessageType
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.messaging.simp.annotation.SubscribeMapping
import org.springframework.stereotype.Controller
import java.util.*


@Controller
class WebSocketController(
    private val webSocketService: WebSocketService
) {

    @SubscribeMapping("/topic/users")
    fun getConnectedUsers(): Set<User> {
        return webSocketService.getConnectedUsers()
    }

    @MessageMapping("/connect")
    @SendTo("/topic/users")
    fun connect(user: String, headerAccessor: SimpMessageHeaderAccessor): Set<User> {
        return webSocketService.connect(user, headerAccessor)
    }

    @MessageMapping("/disconnect")
    @SendTo("/topic/users")
    fun disconnect(user: String, headerAccessor: SimpMessageHeaderAccessor): Set<User> {
        return webSocketService.disconnect(user, headerAccessor)
    }

}
